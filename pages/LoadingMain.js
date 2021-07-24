import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ActivityIndicator, Colors } from 'react-native-paper';

import { connect } from 'react-redux'
import {login} from '../actions';



import firebase from 'firebase/app'
import "firebase/auth"


class LoadingMain extends React.Component { 
  /*
  async load() {     
    const currentUser  = firebase.auth().currentUser;   
    const snapshot = await db.collection("users").doc(currentUser.uid).get()
    const info = snapshot.data();
    this.props.dispatch(addInfo(info));
  }*/

  componentDidMount() {
    const currentUser  = firebase.auth().currentUser; 
    firebase.firestore().collection("users").doc(currentUser.uid).get()
    .then((user) => {
      this.props.dispatch(login(currentUser, user.data()));
      this.props.navigation.replace("Main");
    })
    .catch(error => console.log(error));
  }


  /*componentDidMount() {
    this.props.dispatch(login());
    const currentUser  = firebase.auth().currentUser;
    var docRef =  db.collection("users").doc(currentUser.uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
          info = doc.data();
          this.props.dispatch(addInfo(info));
          console.log("Document data from info:", info);
          //this.props.navigation.navigate("Main"); 
      } else {
          console.log("No such user!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    console.log('mounted')
    //this.props.navigation.navigate("Main"); 
  }*/

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