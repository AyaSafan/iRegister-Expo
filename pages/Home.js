import React, { Component } from 'react'; 
import {StyleSheet,  View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { connect } from 'react-redux';
import { getCourses } from '../actions'

import CourseItem from '../components/CourseItem';


class Home extends Component {
  state = {
    searchText: ''
  };


  componentDidMount() {
    this.props.dispatch(getCourses)
  }

  render() {

    const { searchText } = this.state;

    const renderCourse = ({ item }) => (
      <CourseItem code={item.code} name ={item.name} navigation ={this.props.navigation } />
    );

    return (
    <View style={{padding: 10, paddingTop: 32}}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.setState({ searchText: query }); }}
        value={searchText}
      />
       <FlatList
        data={this.props.courses}
        renderItem={renderCourse}
        keyExtractor={course => course.code}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
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

