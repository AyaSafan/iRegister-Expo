import React, { Component } from 'react'; 
import {StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


import { connect } from 'react-redux';
import { getCourses } from '../actions'



class QRcreate extends Component {

      
  state ={
    code: null,
    date: null,
    dateTime: null,
    time: null,
    exp: null
  };

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
    var dateTime = date + " " + h	+ ":" + m;
    this.setState({date});
    this.setState({dateTime});
  }

  setTime(){
    var now = new Date();
    var time = now.getTime();
    this.setState({time});
    this.formatandSaveDate(now);
  }

  increaseDate(){
    var d = new Date();
    var time = this.state.time + (10*60*1000)
    d.setTime(time);
    this.setState({time}); 
    this.formatandSaveDate(d);
  }

  componentDidMount() {
    this.props.dispatch(getCourses)
    this.setTime()
  }


  render() {
    return (

      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <KeyboardAvoidingView
      style = {{ flex: 1 }}
      {...(Platform.OS === 'ios' && { behavior: 'padding' })}>

      <ScrollView style={{flex: 1, paddingVertical: 50}}>
           

      <View style={styles.sectionContainer}>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 20
        }}>
      
      {this.state.code && this.state.dateTime? 
        <QRCode 
                      size={150}  
                      value={JSON.stringify({code: this.state.code, dateTime: this.state.dateTime})}
                      enableLinearGradient = {true}
                      linearGradient = {['rgb(204,51,0)','rgb(0,0,0)']	}
        />
      : <MaterialCommunityIcons name="qrcode-edit" size={150} color="black" />} 


    
    </View>   

      <TextInput mode='outlined' style={styles.margin}
      label="Course Code"
      onChangeText={(code) => this.setState({code})}
      value={this.state.code}/>

      <TextInput mode='outlined' disabled style={styles.margin}
      label="Expiration Date"
      value={this.state.dateTime}
      left={
      <TextInput.Icon name="plus" onPress={()=> this.increaseDate()} forceTextInputFocus={false} />
      /*<TextInput.Icon name="reload" onPress={()=> this.setTime() } forceTextInputFocus={false} />*/
      }
      right={
        <TextInput.Icon name="reload" onPress={()=> this.setTime() } forceTextInputFocus={false} />
        }
      />     
      
      </View>
      </ScrollView>
    </KeyboardAvoidingView>          
    </SafeAreaView>
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
    }
  });


const mapStateToProps = state => {
  return {currentUser: state.currentUser, info: state.info, courses: state.courses}
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRcreate)
