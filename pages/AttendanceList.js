import React from 'react';
import {  SafeAreaView, ScrollView, StyleSheet, View  } from 'react-native';
import {Surface} from 'react-native-paper';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

//import firebase from 'firebase/app'

import AttendItem from '../components/AttendItem';
import {getRegistration} from '../functions';

function AttendanceList (props){

   const navigation = useNavigation()
   
   const [students, setRegisteration] = useState([]);
   const [isLoading, setLoading] = useState(true);
/*   
   const getRegistration= async (code) =>{
    const db = firebase.firestore(); 
    const doc = await db.collection("registration").doc(code).get()
    const students =  doc.data().students;
    setRegisteration(students);

};
    
*/


useEffect(() => {
    navigation.setOptions({ title: props.route.params.attendance.date });
    getRegistration(props.route.params.code).then((students)=> {setRegisteration(students); setLoading(false)})    
}, []);



  return (
  <SafeAreaView style={{flex: 1}}> 
    {isLoading?  <View style={styles.loading}><ActivityIndicator animating={true} color={Colors.red800} size="large"/></View> : 
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}> 
         {students.length > 0?  
        <Surface style={styles.surface}>            
            {students?.map((student, index) => {return <AttendItem key={index} student={student} attendance={props.route.params.attendance}/>; })} 
        </Surface> 
          : null}   
        </ScrollView>
  }
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
    },
    loading: {
      flex : 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    }
  });
export default AttendanceList;