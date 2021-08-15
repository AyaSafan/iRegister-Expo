import React from 'react'; 
import { StyleSheet, ScrollView, SafeAreaView, View , Text} from 'react-native';
import * as Progress from 'react-native-progress';
import { Surface } from 'react-native-paper';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';


import DateItem from '../components/DateItem';
import {getStatistics} from '../functions';
import {styles} from '../styles';


function Course (props) {

  
    const navigation = useNavigation() ;

    const [dates, setDates] = useState([]);
    const [attended, setAttend] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setLoading] = useState(true);

    const currentUser = useSelector((state) => state.currentUser)       
   

   useEffect(() => {
        navigation.setOptions({ title: props.route.params.code });
        getStatistics(props.route.params.code, currentUser).then((res)=> 
        {setDates(res.dates);  setAttend(res.attended);   setTotal(res.total); setLoading(false)});
   }, []);

   const [loaded] = useFonts({
    Roboto_Thin: require('../assets/fonts/Roboto-Thin.ttf'),
    });
    
    if (!loaded) {
      return null;
    }


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
        } 
        </SafeAreaView> 
    )
    }
/*
const styles = StyleSheet.create({
    surface: {
      padding: 15,
      marginHorizontal: 15,
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

export default Course;
