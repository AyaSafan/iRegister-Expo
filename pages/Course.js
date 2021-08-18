import React from "react";
import { styles } from "../styles";

import { ScrollView, SafeAreaView, View, Text } from "react-native";
import {
  ActivityIndicator,
  Colors,
  Surface,
  Divider,
} from "react-native-paper";

import * as Progress from "react-native-progress";
import { useFonts } from "expo-font";

import DateItem from "../components/DateItem";
import { getStatistics } from "../functions";

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

function Course(props) {
  const navigation = useNavigation();

  const [dates, setDates] = useState([]);
  const [attended, setAttend] = useState(0);
  const [total, setTotal] = useState(0);
  //const [percentage, setPercentage] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    navigation.setOptions({ title: props.route.params.code });
    getStatistics(props.route.params.code, currentUser).then((res) => {
      setDates(res.dates);
      setAttend(res.attended);
      setTotal(res.total);
      //setPercentage(res.percentage);
      setLoading(false);
    });
  }, []);

  const [loaded] = useFonts({
    Roboto_Thin: require("../assets/fonts/Roboto-Thin.ttf"),
  });

  if (!loaded) {
    return null;
  }

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
          <View style={{ marginVertical: 24 }}>
            <Surface style={styles.surface}>
              <Text style={styles.textmuted}>{props.route.params.code}</Text>
              <Text>{props.route.params.name}</Text>
            </Surface>

            <View style={{ margin: 15, padding: 10, alignItems: "center" }}>
              <Progress.Circle
                progress={total == 0 ? 0 : attended / total}
                size={150}
                thickness={15}
                showsText={true}
                color={"rgb(11, 184, 218)"}
                unfilledColor={"rgba(255, 0, 0, 0.4)"}
                strokeCap={"round"}
                borderWidth={0}
              />

              <View style={{ flexDirection: "row", marginTop: 24 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ justifyContent: "flex-start" }}>
                    <Surface style={styles.surface}>
                      <Text
                        style={{
                          ...styles.cardTextBold,
                          color: "rgb(11, 184, 218)",
                        }}
                      >
                        {attended < 10 ? "0" + attended : attended}
                      </Text>
                      <Text style={styles.cardTextThin}>PRESESNT</Text>
                    </Surface>
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ justifyContent: "flex-start" }}>
                    <Surface style={styles.surface}>
                      <Text style={styles.cardTextBold}>
                        {total < 10 ? "0" + total : total}
                      </Text>
                      <Text style={styles.cardTextThin}>TOTAL</Text>
                    </Surface>
                  </View>
                </View>
              </View>
            </View>
            <Surface style={styles.surface}>
              {dates.map((attendance, index) => {
                if (dates.length === index + 1) {
                  return <DateItem key={index} attendance={attendance} />;
                } else {
                  return [
                    <DateItem key={index} attendance={attendance} />,
                    <Divider />,
                  ];
                }
              })}
            </Surface>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default Course;
