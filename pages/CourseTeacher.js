import React from 'react'; 
import { StyleSheet, ScrollView, SafeAreaView, View , Text} from 'react-native';
import { Surface } from 'react-native-paper';
import { ActivityIndicator, Colors } from 'react-native-paper';



import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';


import DateItem from '../components/DateItem';
import {getDates} from '../functions'
import {styles} from '../styles'


function CourseTeacher (props) {

  
    const navigation = useNavigation() ;

    const [dates, setDates] = useState([]);
    const [isLoading, setLoading] = useState(true);


   useEffect(() => {
        navigation.setOptions({ title: props.route.params.code });
        getDates(props.route.params.code).then((dates)=> {setDates(dates); setLoading(false)});
   }, []);



  return (
    <SafeAreaView style={{flex: 1}}> 
      {isLoading?  <View style={styles.loading}><ActivityIndicator animating={true} color={Colors.red800} size="large"/></View> :
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}> 
        <View style={{marginVertical: 32}}>

            <Surface style={styles.surface}>
                    <Text style={styles.textmuted}>{ props.route.params.code }</Text>
                    <Text>{ props.route.params.name }</Text>
            </Surface>
              {dates.length > 0? 
                <Surface style={styles.surface}>
                {dates?.map((attendance, index) => {return <DateItem key={index} code={props.route.params.code} attendance={attendance} navigation={navigation}/>; })}
                </Surface> 
              : null}
            </View>
        </ScrollView> 
      }
    </SafeAreaView> 
    
  )
}
/*
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
    },
    loading: {
      flex : 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    }
  });*/

export default CourseTeacher;
