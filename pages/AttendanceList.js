import React from "react";
import { styles } from "../styles";

import { SafeAreaView, ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Colors,
  Surface,
  Divider,
} from "react-native-paper";

import AttendItem from "../components/AttendItem";
import { getRegistration } from "../functions";

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

function AttendanceList(props) {
  const navigation = useNavigation();

  const [students, setRegisteration] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: props.route.params.attendance.date });
    getRegistration(props.route.params.code).then((students) => {
      setRegisteration(students);
      setLoading(false);
    });
  }, []);

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
          {students.length > 0 ? (
            <Surface style={{ ...styles.surface, marginTop: 32 }}>
              {students.map((student, index) => {
                if (students.length === index + 1) {
                  return (
                    <AttendItem
                      key={index}
                      student={student}
                      attendance={props.route.params.attendance}
                    />
                  );
                } else {
                  return [
                    <AttendItem
                      key={index}
                      student={student}
                      attendance={props.route.params.attendance}
                    />,
                    <Divider />,
                  ];
                }
              })}
            </Surface>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default AttendanceList;
