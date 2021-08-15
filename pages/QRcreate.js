import React, { Component } from 'react'; 
import {StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View, Pressable, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {TextInput, Button } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


import { connect } from 'react-redux';
import { getCourses } from '../actions'

import Message from '../components/Message'
import {formatDate, havePermission} from '../functions'
import {styles} from '../styles'


class QRcreate extends Component {

      
  state ={    
    date: null,
    time: null,
    timeStamp: null,
    errorMessage: null,

    code: null,
    permission: false,
    visibility: false
  };

  setTime = () =>{
    var now = new Date();
    var formattedDate = formatDate(now)
    this.setState({date: formattedDate.date, time: formattedDate.time});
    var timeStamp = now.getTime();
    this.setState({timeStamp});    
  }

  increaseTime = () =>{
    var timeStamp = this.state.timeStamp + (10*60*1000)
    this.setState({timeStamp});
    var date = new Date(timeStamp);
    var formattedDate = formatDate(date)
    this.setState({date: formattedDate.date, time: formattedDate.time});

  }

  getPermission(code){
    var permission = havePermission(code,this.props.courses);
    this.setState({permission})
    permission? this.setState({errorMessage: null }): this.setState({errorMessage: "Course permission denied" });
  }

  clearErrorMessage = () => {
    this.setState({
      errorMessage: null
    })
  }


  componentDidMount() {
    this.props.dispatch(getCourses)
    this.setTime()
  }


  render() {
    let logoFromFile = require('../assets/click.png');
    return (
    <>      
      
      <Modal
        style={styles.modalContent}
        visible={this.state.visibility}
        onRequestClose={() =>  this.setState({visibility: false})}
        backdropColor = {'white'}
        backdropOpacity = {1}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
      >
        <TouchableWithoutFeedback onPress={() =>  this.setState({visibility: false})}>
          <View style={styles.inner}>
          <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
            <QRCode 
                      size={250}  
                      value={JSON.stringify({code: this.state.code, date: this.state.date, time: this.state.time })}
                      enableLinearGradient = {true}
                      linearGradient = {['rgb(204,51,0)','rgb(0,0,0)']	}
            /> 
          </View> 
          </View>
          </TouchableWithoutFeedback> 
        </Modal>

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex:1}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.sectionContainer}>

      <View style={styles.logo}>
      
      {this.state.permission? 
      <Pressable onPress={() => this.setState({visibility:  true})}>
        <QRCode 
                      size={150}  
                      value={JSON.stringify({code: this.state.code, date: this.state.date, time: this.state.time })}
                      enableLinearGradient = {true}
                      linearGradient = {['rgb(204,51,0)','rgb(0,0,0)']	}
                      logo={logoFromFile}
                      logoSize={50}
        />
      </Pressable>
      : <MaterialCommunityIcons name="qrcode-edit" size={150} color="black" />} 


    
    </View>   

      <TextInput mode='outlined' style={styles.margin}
      label="Course Code"
      onChangeText={(code) => {this.setState({code}); this.setState({permission : false});}}
      value={this.state.code}/>

      <TextInput mode='outlined' disabled style={styles.margin}
      label="Expiration"
      value={this.state.date + " "+ this.state.time}
      left={
      <TextInput.Icon name="plus" onPress={this.increaseTime} forceTextInputFocus={false} />
      }
      right={
      <TextInput.Icon name="reload" onPress={this.setTime} forceTextInputFocus={false} />
      }
      /> 

      <Button style={styles.margin}  mode="contained" onPress={() => this.getPermission(this.state.code)}> CREATE QR </Button>
          
      
    </View>


  
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  
    {this.state.errorMessage && (
      <Message errorMessage= {this.state.errorMessage} clearErrorMessage = {this.clearErrorMessage}/>
    )}         
    </>
    )
    }
}
/*
const styles = StyleSheet.create({
    sectionContainer: {
      paddingHorizontal: 24,
      paddingVertical: 100
    },
    margin:{
        marginVertical: 5
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0
    },
    container: {
      flex: 1
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: "space-around"
    },
  });*/


const mapStateToProps = state => {
  return {currentUser: state.currentUser, courses: state.courses}
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRcreate)
