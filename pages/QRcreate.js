import React from "react";
import { styles } from "../styles";

import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  ToastAndroid
} from "react-native";
import { TextInput, Button } from "react-native-paper";

import QRCode from "react-native-qrcode-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//import Message from "../components/Message";
import { formatDate, havePermission, getKey } from "../functions";

import { connect } from "react-redux";
import { getCourses } from "../actions";

class QRcreate extends React.Component {
  state = {
    date: null,
    time: null,
    timeStamp: null,
    //errorMessage: null,

    code: null,
    secretKey: null,
    permission: false,
    visibility: false,
  };

  setTime = () => {
    var now = new Date();
    var formattedDate = formatDate(now);
    this.setState({ date: formattedDate.date, time: formattedDate.time });
    var timeStamp = now.getTime();
    this.setState({ timeStamp });
  };

  increaseTime = () => {
    var timeStamp = this.state.timeStamp + 10 * 60 * 1000;
    this.setState({ timeStamp });
    var date = new Date(timeStamp);
    var formattedDate = formatDate(date);
    this.setState({ date: formattedDate.date, time: formattedDate.time });
  };

  getPermission(code) {
    var permission = havePermission(code, this.props.courses);
    this.setState({ permission });
    /*
    permission
      ? this.setState({ errorMessage: null })
      : this.setState({ errorMessage: "Course permission denied" });*/
    !permission? ToastAndroid.show("Course permission denied", ToastAndroid.SHORT) : undefined;
  }
  getSecretKey(code) {
    getKey(code).then((secretKey) => this.setState({ secretKey }));
  }

  clearErrorMessage = () => {
    this.setState({
      errorMessage: null,
    });
  };

  componentDidMount() {
    this.props.dispatch(getCourses);
    this.setTime();
  }

  render() {
    let logoFromFile = require("../assets/click.png");
    return (
      <>
        <Modal
          style={styles.modalContent}
          visible={this.state.visibility}
          onRequestClose={() => this.setState({ visibility: false })}
          backdropColor={"white"}
          backdropOpacity={1}
          animationIn={"slideInLeft"}
          animationOut={"slideOutRight"}
        >
          <TouchableWithoutFeedback
            onPress={() => this.setState({ visibility: false })}
          >
            <View style={styles.inner}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <QRCode
                  size={250}
                  value={JSON.stringify({
                    code: this.state.code,
                    timeStamp: this.state.timeStamp,
                    secretKey: this.state.secretKey,
                  })}
                  enableLinearGradient={true}
                  linearGradient={["rgb(204,51,0)", "rgb(0,0,0)"]}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

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
                  {this.state.permission ? (
                    <Pressable
                      onPress={() => this.setState({ visibility: true })}
                    >
                      <QRCode
                        size={150}
                        value={JSON.stringify({
                          code: this.state.code,
                          timeStamp: this.state.timeStamp,
                          secretKey: this.state.secretKey,
                        })}
                        enableLinearGradient={true}
                        linearGradient={["rgb(204,51,0)", "rgb(0,0,0)"]}
                        logo={logoFromFile}
                        logoSize={50}
                      />
                    </Pressable>
                  ) : (
                    <MaterialCommunityIcons
                      name="qrcode-edit"
                      size={150}
                      color="black"
                    />
                  )}
                </View>

                <TextInput
                  mode="outlined"
                  style={styles.margin}
                  label="Course Code"
                  onChangeText={(code) => {
                    this.setState({ code });
                    this.setState({ permission: false });
                  }}
                  value={this.state.code}
                />

                <TextInput
                  mode="outlined"
                  disabled
                  style={styles.margin}
                  label="Expiration"
                  value={this.state.date + " " + this.state.time}
                  left={
                    <TextInput.Icon
                      name="plus"
                      onPress={this.increaseTime}
                      forceTextInputFocus={false}
                    />
                  }
                  right={
                    <TextInput.Icon
                      name="reload"
                      onPress={this.setTime}
                      forceTextInputFocus={false}
                    />
                  }
                />

                <Button
                  style={styles.margin}
                  mode="contained"
                  onPress={() => {
                    this.getPermission(this.state.code);
                    this.getSecretKey(this.state.code);
                  }}
                >
                  CREATE QR
                </Button>
                </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>

        {/*this.state.errorMessage && (
          <Message
            errorMessage={this.state.errorMessage}
            clearErrorMessage={this.clearErrorMessage}
          />
        )*/}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser, courses: state.courses };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRcreate);
