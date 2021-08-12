import React from 'react'; 
import {StyleSheet, Text, Pressable } from 'react-native';
import { Surface } from 'react-native-paper';

import { useSelector } from 'react-redux';


function CourseItem (props) {

  const info = useSelector((state) => state.info)
      return (
        <Pressable 
             onPress={() =>  props.navigation.navigate(info.role =='teacher'? "CourseTeacher":"Course", {code: props.code, name: props.name})} >
              <Surface style={styles.surface}>
                <Text style={styles.textmuted}>{ props.code }</Text>
                <Text>{ props.name }</Text>
              </Surface>
        </Pressable>

      )
};


const styles = StyleSheet.create({
    surface: {
      padding: 15,
      margin: 8,
      marginHorizontal: 15,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      elevation: 4,
      borderRadius: 8,

      borderLeftWidth: 5,
      borderLeftColor: 'rgba(255, 0, 0, 0.4)'
    },
    textmuted:{
      color: '#6c757d'
    }
  });



export default CourseItem;