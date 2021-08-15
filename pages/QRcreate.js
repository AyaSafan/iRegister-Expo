import React, { Component } from 'react'; 
import {StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View, Pressable, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {TextInput, Button } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


import { connect } from 'react-redux';
import { getCourses } from '../actions'

import Message from '../components/Message'
import {formatDate, havePermission} from '../functions'

class QRcreate extends Component {

      
  state ={    
    date: null,
    time: null,
    //dateTime: null,
    timeStamp: null,
    //exp: null,
    errorMessage: null,

    code: null,
    permission: false,
    visibility: false
  };
/*
  formatandSaveDate(date){
    var dd = date.getDay();
    var mm = date.getMonth(); 
    var yyyy = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    dd = dd < 10 ? "0" + dd : dd;
    mm = mm < 10 ? "0" + mm : mm;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    var date = dd + '.'+ mm + '.'+ yyyy
    //var dateTime = date + " " + h	+ ":" + m;
    this.setState({date});
    //this.setState({dateTime});
  }*/

  setTime = () =>{
    var now = new Date();
    var formattedDate = formatDate(now)
    this.setState({date: formattedDate.date, time: formattedDate.time});
    var timeStamp = now.getTime();
    this.setState({timeStamp});    
    //this.formatandSaveDate(now);
  }

  increaseTime = () =>{
    var timeStamp = this.state.timeStamp + (10*60*1000)
    this.setState({timeStamp});
    var date = new Date(timeStamp);
    //date.setTime(timeStamp);    
    var formattedDate = formatDate(date)
    this.setState({date: formattedDate.date, time: formattedDate.time});
    //this.setState({date: date.date, time: date.time}); 
    //this.formatandSaveDate(date);
  }

  getPermission(code){
    var permission = havePermission(code,this.props.courses);
    this.setState({permission})
    permission? this.setState({errorMessage: null }): this.setState({errorMessage: "Course permission denied" });
    /*
    for(let i = 0; i < this.props.courses.length; i++ ){
      if(code == this.props.courses[i].code){
        this.setState({permission : true})
        this.setState({errorMessage: null })
        break;
      }else{
        this.setState({permission : false})
        this.setState({errorMessage: "Permission for this course failed" })      }
    }*/
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
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.sectionContainer}>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 20
        }}>
      
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
      //borderColor: 'rgba(0, 0, 0, 1)',
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
  });


const mapStateToProps = state => {
  return {currentUser: state.currentUser, courses: state.courses}
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRcreate)
