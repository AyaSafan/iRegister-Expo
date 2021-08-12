import React from 'react'; 
import { StyleSheet, ScrollView, SafeAreaView, View , Text} from 'react-native';
import * as Progress from 'react-native-progress';
import { Surface } from 'react-native-paper';


import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';

import firebase from 'firebase/app'

import DateItem from '../components/DateItem';

function Course (props) {

  
    const navigation = useNavigation() ;

    const [dates, setDates] = useState([]);
    const [attended, setAttend] = useState(0);
    const [total, setTotal] = useState(0);

    const currentUser = useSelector((state) => state.currentUser)       

    const getDates= async (code) =>{
        const db = firebase.firestore(); 
        const snapshot = await db.collection("attendance").doc(code).collection("Dates").get()
        const dates = []
        snapshot.docs.map(doc => dates.push(doc.data()));
        setDates(dates);

        //getStatistics
        let total = 0;
        let attended = 0;
        for (let i = 0; i < dates.length; i++) {
            total +=1
            if(dates[i].students.includes(currentUser.uid)){
                attended +=1;
            }       
        }
        setAttend(attended);
        setTotal(total)
 
    };
        

   

   useEffect(() => {
        navigation.setOptions({ title: props.route.params.code });
        getDates(props.route.params.code);
   }, []);

   const [loaded] = useFonts({
    Roboto_Thin: require('../assets/fonts/Roboto-Thin.ttf'),
    });
    
    if (!loaded) {
      return null;
    }


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

            <View style={{margin: 15, padding: 10, alignItems: 'center'}}>
                <Progress.Circle progress={total == 0? 0 : attended/total}  size={150} thickness={15} showsText={true}
                color={'rgb(11, 184, 218)'} unfilledColor={'rgba(255, 0, 0, 0.4)'} strokeCap={'round'} borderWidth={0} />
            
            {/*<Text style={{ alignSelf: 'flex-end', color: '#6c757d'}}> {attended}/{total}  </Text>*/}
            
            <View style={{flexDirection:"row", marginTop: 24}}>
                    <View style={{flex:1}}>
                        <View style={{justifyContent: 'flex-start',}} >
                        <Surface style={styles.surface}>
                                <Text style={{alignSelf: 'center', fontFamily: 'Roboto_Thin', fontSize: 30, fontWeight:'bold', color:'rgb(11, 184, 218)'}}>{ attended < 10 ? "0" + attended : attended }</Text>
                                <Text style={{alignSelf: 'center', fontFamily: 'Roboto_Thin', fontSize: 18,}}>PRESESNT</Text>
                        </Surface>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                    <View style={{justifyContent: 'flex-start',}} >
                    <Surface style={styles.surface}>
                            <Text style={{alignSelf: 'center', fontFamily: 'Roboto_Thin', fontSize: 30, fontWeight:'bold', }}>{ total < 10 ? "0" + total : total  }</Text>
                            <Text style={{alignSelf: 'center', fontFamily: 'Roboto_Thin', fontSize: 18,}}>TOTAL</Text>
                    </Surface>
                    </View>
                    </View>
            </View>

            </View>
            <Surface style={styles.surface}>
            {dates.map((attendance, index) => {return <DateItem key={index} attendance={attendance} />; })}
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
      elevation: 4,
      borderRadius: 8,
      
    },
    textmuted:{
      color: '#6c757d'
    }
  });

export default Course;
