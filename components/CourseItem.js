import React from 'react'; 
import {StyleSheet, Text, Pressable } from 'react-native';
import { Surface } from 'react-native-paper';

export default CourseItem = ({ code , name , navigation }) => (
    <Pressable 
             onPress={() =>  navigation.navigate("Course", {code: code})} >
              <Surface style={styles.surface}>
                <Text style={styles.textmuted}>{ code }</Text>
                <Text>{ name }</Text>
              </Surface>
    </Pressable>
              
  );

const styles = StyleSheet.create({
    surface: {
      backgroundColor: '#f2f2f2',
      padding: 10,
      margin: 8,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      elevation: 4,
    },
    textmuted:{
      color: '#6c757d'
    }
  });