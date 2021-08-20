import React from "react";
import { styles } from "../styles";

import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";

import { Message } from "../components/Message";

import firebase from "firebase/app";
import "firebase/auth";

class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ email: "", password: "", errorMessage: null });
        this.props.navigation.navigate("LoadingMain");
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  constructor(props) {
    super(props);
    this.clearErrorMessage = this.clearErrorMessage.bind(this);
  }

  clearErrorMessage = () => {
    this.setState({
      errorMessage: null,
    });
  };

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            {...(Platform.OS === "ios" && { behavior: "padding" })}
          >
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.sectionContainer}>
                <View style={styles.logo}>
                  <Image
                    source={require("../assets/iRegister_is_.png")}
                    style={{ alignSelf: "center" }}
                  />
                </View>

                <TextInput
                  style={{ ...styles.margin, backgroundColor: "white" }}
                  mode="outlined"
                  label="Email"
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                />

                <TextInput
                  style={{ ...styles.margin, backgroundColor: "white" }}
                  mode="outlined"
                  secureTextEntry={true}
                  label="Password"
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                />

                <Button
                  style={styles.margin}
                  mode="contained"
                  onPress={this.handleLogin}
                >
                  Login
                </Button>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>

        {this.state.errorMessage && (
          <Message
            errorMessage={this.state.errorMessage}
            clearErrorMessage={this.clearErrorMessage}
          />
        )}
      </>
    );
  }
}

export default Login;
