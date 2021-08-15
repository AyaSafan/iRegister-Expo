import React, { Component } from 'react'; 
import {StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View, Image } from 'react-native';
import {TextInput, Button} from 'react-native-paper';

import firebase from 'firebase/app'
import "firebase/auth"

import {styles} from '../styles'
import { Message } from '../components/Message';

class Login extends Component {
  
  state = { email: "", password: "", errorMessage: null };
  
  handleLogin = () => {
    const { email, password } = this.state;
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("LoadingMain");
      })
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  constructor(props) {
    super(props)
    this.clearErrorMessage = this.clearErrorMessage.bind(this)
  }

  clearErrorMessage = () => {
    this.setState({
      errorMessage: null
    })
  }  
  
  
  
  render() {

    return (
    <>
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <KeyboardAvoidingView  style = {{ flex: 1 }}   {...(Platform.OS === 'ios' && { behavior: 'padding' })}>

          <ScrollView style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>

      <View style={styles.sectionContainer}>
            <View style={styles.logo}>
            <Image  source={require('../assets/iRegister_is_.png')} style={{alignSelf: 'center'}}/>
            </View>

              <TextInput style={styles.margin} mode='outlined'
              label="Email"
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}/>

              <TextInput style={styles.margin} mode='outlined' secureTextEntry={true}
              label="Password"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>

              <Button style={styles.margin}  mode="contained" onPress={this.handleLogin}> Login </Button>

            </View> 
          </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>     
    
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
    //marginTop: 24,
    //paddingHorizontal: 24,
    paddingHorizontal: 24,
    paddingVertical: 100
  },
  margin:{
    marginVertical: 5
  },
});
*/

export default Login;
