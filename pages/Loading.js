import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';

import firebase from 'firebase/app'
import "firebase/auth"


export default class Loading extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "LoadingMain" : "Login");
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{alignSelf: 'center'}}>
        <Image  source={require('../assets/iRegister_is_.png')} style={{alignSelf: 'center', width: 100, height: 120, marginBottom: 20}}/>
        </View>
        <ActivityIndicator animating={true} color={Colors.red800} size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});