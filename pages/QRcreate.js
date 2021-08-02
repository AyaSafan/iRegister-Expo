import React, { Component } from 'react'; 
import {StyleSheet, SafeAreaView,  View } from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import { Modal, Portal } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';



class QRcreate extends Component {

      
   state ={
    courseCode: "",
    courseDate:"",
    visibility: false,
    courses: []
};

async getCourses() { 
    const db = firebase.firestore(); 
    const snapshot = await db.collection("courses").where("teacherID", "==", this.props.currentUser.uid).get()
    const courses = snapshot.docs.map(doc => doc.data());  
    this.setState({ courses });
}

async componentDidMount() {
  this.getCourses();
}


    render() {
    return (
        <SafeAreaView>              
      <Portal>
        <Modal visible={this.state.visibility} onDismiss={() => this.setState({visibility: false})} contentContainerStyle={ {backgroundColor: 'white', padding: 20, margin: 20}}>
            <View style={{alignSelf: 'center'}}>
              <QRCode 
              logoSize={200} 
              size={250}  
              value={JSON.stringify({courseCode: this.state.courseCode, courseDate: this.state.courseDate})}
              /> 
          </View>  
        </Modal>
      </Portal>

      

      <View style={styles.sectionContainer}>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>

    {this.state.courseCode? 
      <QRCode 
              size={200}  
              value={JSON.stringify({courseCode: this.state.courseCode, courseDate: this.state.courseDate})}
      />       
      : null
    }
    </View>
      <TextInput mode='outlined'
      label="Course Code"
      onChangeText={(courseCode) => this.setState({courseCode})}
      value={this.state.courseCode}/>

      <TextInput mode='outlined'
      label="DD/MM/YYYY"
      onChangeText={(courseDate) => this.setState({courseDate})}
      value={this.state.courseDate}/>


      <Button style={styles.margin}
      mode="contained"
      onPress={() => this.setState({visibility: this.state.courseDate && this.state.courseCode ? true: false})}
      > Create QR </Button>              
      </View>     
        

      </SafeAreaView>
    )
    }
}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
      paddingVertical: 100
    },
    margin:{
        marginVertical: 5
    }
  });

export default QRcreate;