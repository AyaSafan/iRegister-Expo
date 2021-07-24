import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';

import { connect } from 'react-redux'
import {login} from '../actions';



import firebase from 'firebase/app'
import "firebase/auth"


class LoadingMain extends React.Component { 

  componentDidMount() {
    //Get user
    const currentUser  = firebase.auth().currentUser; 
    //Get user extra info
    firebase.firestore().collection("users").doc(currentUser.uid).get()
    .then((user) => {
      this.props.dispatch(login(currentUser, user.data()));
      this.props.navigation.replace("Main");
    })
    .catch(error => console.log(error));
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

const mapStateToProps = state => {
  return {currentUser: state.currentUser, info: state.info}
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingMain)