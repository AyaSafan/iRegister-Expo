import React, { Component } from 'react'; 
import {StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View, Image } from 'react-native';
import {TextInput, Button, Snackbar, Text} from 'react-native-paper';

import * as firebase from "firebase";

const Message = (props) => {

  const [visible, setVisible] = React.useState(true);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  {props.clearErrorMessage}

  return (
    <View>
      {props.errorMessage && (
            <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Dismiss',
              onPress: () => {
                onToggleSnackBar
                {props.clearErrorMessage()}
              },
            }}>
           {props.errorMessage}
          </Snackbar>
      )} 
    </View>
  );
};

class Login extends Component {
  
  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("Home");
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
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <KeyboardAvoidingView
      style = {{ flex: 1 }}
      {...(Platform.OS === 'ios' && { behavior: 'padding' })}>

      <ScrollView style={{flex: 1, paddingVertical: 50}}>
        <View style={{alignSelf: 'center'}}>
        <Image  source={require('../assets/iRegister_is_.png')} style={{alignSelf: 'center'}}/>
        </View>



        <View style={styles.sectionContainer}>

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
    
    {this.state.errorMessage && (
            <Message errorMessage= {this.state.errorMessage} clearErrorMessage = {this.clearErrorMessage}/>
    )}    
     
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


export default Login;
