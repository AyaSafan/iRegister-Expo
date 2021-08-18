import React from "react";
import { styles } from "../styles";
import { theme } from "../styles";

import { SafeAreaView, ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Colors,
  Surface,
  Divider,
  Chip,
  FAB,
  ToastAndroid
} from "react-native-paper";

import AttendItem from "../components/AttendItem";
import { getAttendance } from "../functions";

import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

function AttendanceList(props) {
  const navigation = useNavigation();

  const [students, setAttendance] = useState([]); //[{"displayname":"Aya Safan", "uid":"EX12....", "attended": true}]
  const [isLoading, setLoading] = useState(true);
  const [presentSelected, setPresentSelected] = useState(true);
  const [absentSelected, setAbsentSelected] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: props.route.params.attendance.date });
    getAttendance(props.route.params.code, props.route.params.attendance.students ).then((students) => {
      setAttendance(students);
      setSelectedStudents(students);
      setLoading(false);
    });
  }, []);

  const changeSelectedStudents = () => {
    //filter == "present"? setPresentSelected(!presentSelected) : setAbsentSelected(!absentSelected);
    if (presentSelected && absentSelected) {
      setSelectedStudents(students);
      //console.log('both')
    } else if (!presentSelected && !absentSelected) {
      setSelectedStudents([]);
      //console.log('none')
    } else if (presentSelected && !absentSelected) {
      let present = [];
      students.forEach((student)=>{ student.attended? present.push(student): undefined})
      /*
      for (let i = 0; i < students.length; i++) {
        if (students[i]["attended"]) {
          present.push(students[i]);
        }
      }*/
      setSelectedStudents(present);
      //console.log('present')
    } else if (!presentSelected && absentSelected) {
      let absent = [];
      students.forEach((student)=>{ !student.attended? absent.push(student): undefined})
      /*
      for (let i = 0; i < students.length; i++) {
        if (!students[i]["attended"]) {
          absent.push(students[i]);
        }
      }*/
      setSelectedStudents(absent);
      //console.log('absent')
    }
  };

  useEffect(() => {
    changeSelectedStudents();
  }, [presentSelected, absentSelected]);

  const saveFile = async () => {
    //console.log("file");
    ToastAndroid.show("Downloading attendance file", ToastAndroid.SHORT);
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      //create file content
      var file = selectedStudents
        .map(function (item) {
          return `Name: ${item["displayname"]} \nID: ${item["id"]}\n${item["attended"]? "PRESENT": "ABSENT"}\n\n`;
        })
        .toString();
      var header = `${props.route.params.code} Attendance`;
      var date = props.route.params.attendance.date;
      file = `${header}\n${date}\n\n${file}`;
      //create file txt
      let fileUri =
        FileSystem.documentDirectory + `${props.route.params.code}.txt`;
      await FileSystem.writeAsStringAsync(fileUri, file, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      ToastAndroid.showWithGravity(
        "Download Success.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={Colors.red800}
            size="large"
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 24,
              marginHorizontal: 15,
            }}
          >
            <View style={{ flex: 1 }}>
              <View style={{ justifyContent: "flex-start" }}>
                <Chip
                  icon="check-circle"
                  mode="outlined"
                  style={{ marginHorizontal: 4 ,backgroundColor:'white', borderColor: presentSelected? theme.accent: 'gray', borderWidth: 1}}
                  onPress={() => {
                    setPresentSelected(!presentSelected);
                  }}
                  selectedColor={presentSelected? theme.accent: 'gray'}
                  selected={presentSelected}
                >
                  PRESENT
                </Chip>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ justifyContent: "flex-start" }}>
                <Chip
                  icon="close-circle"
                  mode="outlined"
                  style={{ marginHorizontal: 4 ,backgroundColor:'white', borderColor: absentSelected? theme.primary: 'gray', borderWidth: 1 }}
                  onPress={() => {
                    setAbsentSelected(!absentSelected);
                  }}
                  selectedColor={absentSelected? theme.primary: 'gray'}
                  selected={absentSelected}
                >
                  ABSENT
                </Chip>
              </View>
            </View>
          </View>

          {selectedStudents.length > 0 ? (
            <Surface style={styles.surface}>
              {selectedStudents.map((student, index) => {
                if (selectedStudents.length === index + 1) {
                  return (
                    <AttendItem
                      key={index}
                      student={student}
                      //attendance={props.route.params.attendance}
                    />
                  );
                } else {
                  return [
                    <AttendItem
                      key={index}
                      student={student}
                      //attendance={props.route.params.attendance}
                    />,
                    <Divider />,
                  ];
                }
              })}
            </Surface>
          ) : null}
        </ScrollView>
      )}

        <FAB
          style={styles.fab}
          small
          icon="download"
          onPress={() => saveFile()}
        />

    </SafeAreaView>
  );
}

export default AttendanceList;
