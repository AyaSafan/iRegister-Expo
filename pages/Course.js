import React from 'react'; 
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

function Course (props) {

   const navigation = useNavigation()    
   useEffect(() => {
        navigation.setOptions({ title: props.route.params.code });
   });

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
        <Text>Hello, {props.route.params.code}!</Text>
        </View>
    )
    }

export default Course;
