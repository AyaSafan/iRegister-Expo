import React, { Component } from 'react'; 
import {StyleSheet,  View, Text, ScrollView } from 'react-native';
import { Searchbar, Surface, TouchableRipple } from 'react-native-paper';

import { connect } from 'react-redux';

import firebase from 'firebase/app'

class Home extends Component {
  state = {
    searchText: '',
    courses: []
  };

  async getCourses() { 
    const db = firebase.firestore(); 
    if(this.props.info.role == "teacher"){    
      const snapshot = await db.collection("courses").where("teacherID", "==", this.props.currentUser.uid).get()
      const courses = snapshot.docs.map(doc => doc.data());  
      this.setState({ courses });
    } else{
      const registrationData = await db.collection("registration").where("studentID", "==", this.props.currentUser.uid).get()
      const registrations = registrationData.docs.map(doc => doc.data());
      let codes = [];
      var i;
      for (i in registrations){ codes.push(registrations[i].courseCode)}
      const snapshot = await db.collection("courses").where("code", "in", codes).get()
      const courses = snapshot.docs.map(doc => doc.data()); 
      this.setState({ courses });   
      }
  }

  async componentDidMount() {
    this.getCourses();
  }

  render() {
    const { searchText } = this.state;
    return (
    <View style={{padding: 10, paddingTop: 32}}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ searchText: query }); }}
        value={searchText}
      />
       <ScrollView >
       { this.state.courses.map((course, index) => (
        
        <TouchableRipple key={index}
           onPress={() =>  this.props.navigation.navigate("Course", {code: course.code})}
           rippleColor="rgba(0, 0, 0, 0)"   >
            <Surface style={styles.surface}>
              <Text style={styles.textmuted}>{ course.code }</Text>
              <Text>{ course.name }</Text>
            </Surface> 

         </TouchableRipple>
            
        ))}
       
       </ScrollView>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    surface: {
      backgroundColor: '#f2f2f2',
      padding: 10,
      margin: 8,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      elevation: 4,
    },
    textmuted:{
      color: '#6c757d'
    }
  });


const mapStateToProps = state => {
    return {currentUser: state.currentUser, info: state.info}
}

export default connect(mapStateToProps)(Home)

//export default Home;