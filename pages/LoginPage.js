import React, { Component } from 'react'; 
import {StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View, Image } from 'react-native';
import {TextInput, Button} from 'react-native-paper';



class LoginPage extends Component {
  state ={
    userID: "",
    password:""
  } 

  render() {

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <KeyboardAvoidingView
          style={{ flex: 1}}>

        <ScrollView style={{flex: 1, paddingVertical: 100}}>
          <View style={{alignSelf: 'center'}}>
          <Image  source={require('../assets/iRegister_is_.png')} style={{alignSelf: 'center'}}/>
          </View>

          <View style={styles.sectionContainer}>

          <TextInput style={styles.margin} mode='outlined'
           label="User ID"
           onChangeText={(userID) => this.setState({userID})}
           value={this.state.userID}/>

           <TextInput style={styles.margin} mode='outlined' secureTextEntry={true}
           label="Password"
           onChangeText={(password) => this.setState({password})}
           value={this.state.password}/>

           <Button style={styles.margin}
           mode="contained"> Login </Button>              
          </View>    
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>

      
    )
  }
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  margin:{
    marginVertical: 5
  }
});


export default LoginPage;
