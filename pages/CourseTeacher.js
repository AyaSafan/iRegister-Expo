import React from 'react'; 
import { StyleSheet, ScrollView, SafeAreaView, View , Text} from 'react-native';
import { Surface } from 'react-native-paper';


import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';


import firebase from 'firebase/app'

import DateItem from '../components/DateItem';

function CourseTeacher (props) {

  
    const navigation = useNavigation() ;

    const [dates, setDates] = useState([]);


    const getDates= async (code) =>{
        const db = firebase.firestore(); 
        const snapshot = await db.collection("attendance").doc(code).collection("Dates").get()
        const dates = []
        snapshot.docs.map(doc => dates.push(doc.data()));
        setDates(dates);
    };
        

   

   useEffect(() => {
        navigation.setOptions({ title: props.route.params.code });
        getDates(props.route.params.code);
   }, []);



    return (
        <SafeAreaView> 
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}> 
        <View style={{marginVertical: 32}}>

            <Surface style={styles.surface}>
                    <Text style={styles.textmuted}>{ props.route.params.code }</Text>
                    <Text>{ props.route.params.name }</Text>
            </Surface>

            <Surface style={styles.surface}>
            {dates.map((attendance, index) => {return <DateItem key={index} code={props.route.params.code} attendance={attendance} navigation={navigation}/>; })}
            </Surface> 

            </View>
        </ScrollView> 
        </SafeAreaView> 
    )
    }

const styles = StyleSheet.create({
    surface: {
      padding: 15,
      marginHorizontal: 15,
      marginVertical: 8,
      elevation: 4,
      borderRadius: 8,
      
    },
    textmuted:{
      color: '#6c757d'
    }
  });

export default CourseTeacher;
