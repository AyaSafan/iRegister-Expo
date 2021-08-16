import React from "react";
import { styles } from "../styles";

import { Text, Pressable } from "react-native";
import { Surface } from "react-native-paper";

import { useSelector } from "react-redux";

function CourseItem(props) {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <Pressable
      onPress={() =>
        props.navigation.navigate(
          currentUser.role == "teacher" ? "CourseTeacher" : "Course",
          { code: props.code, name: props.name }
        )
      }
    >
      <Surface style={styles.course}>
        <Text style={styles.textmuted}>{props.code}</Text>
        <Text>{props.name}</Text>
      </Surface>
    </Pressable>
  );
}

export default CourseItem;
