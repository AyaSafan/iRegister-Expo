import React from 'react';
import {  SafeAreaView, ScrollView, StyleSheet  } from 'react-native';
import {Surface} from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import firebase from 'firebase/app'

import AttendItem from '../components/AttendItem';

function AttendanceList (props){

   const navigation = useNavigation()
   
   const [students, setRegisteration] = useState([]);
   
   const getRegistration= async (code) =>{
    const db = firebase.firestore(); 
    const doc = await db.collection("registration").doc(code).get()
    const students =  doc.data().students;
    setRegisteration(students);

};
    



useEffect(() => {
    navigation.setOptions({ title: props.route.params.attendance.date });
    getRegistration(props.route.params.code);
}, []);

   useEffect(() => {
        navigation.setOptions({ title: props.route.params.attendance.date });
   });
    

    return (
        <SafeAreaView> 
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}> 
        <Surface style={styles.surface}>            
            {students.map((uid, index) => {return <AttendItem key={index} uid={uid} attendance={props.route.params.attendance}/>; })} 
        </Surface>    
        </ScrollView>
        </SafeAreaView>       
    );
}

const styles = StyleSheet.create({
    surface: {
      padding: 15,
      margin: 8,
      marginHorizontal: 15,
      elevation: 4,
      borderRadius: 8,
  
      marginTop: 32
    },
    textmuted:{
      color: '#6c757d'
    }
  });
export default AttendanceList;