import React, { Component } from 'react'; 
import {StyleSheet,  View, Text, ScrollView, Pressable } from 'react-native';
import { Searchbar, Surface } from 'react-native-paper';

import { connect } from 'react-redux';
import { getCourses } from '../actions'


class Home extends Component {
  state = {
    searchText: ''
  };


  componentDidMount() {
    this.props.dispatch(getCourses)
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
       { this.props.courses.map((course, index) => (
        
        <Pressable key={index}
           onPress={() =>  this.props.navigation.navigate("Course", {code: course.code})} >
            <Surface style={styles.surface}>
              <Text style={styles.textmuted}>{ course.code }</Text>
              <Text>{ course.name }</Text>
            </Surface> 

         </Pressable>
            
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
    return {currentUser: state.currentUser, info: state.info, courses: state.courses}
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

