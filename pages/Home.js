import React, { Component } from 'react'; 
import {StyleSheet,  View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { connect } from 'react-redux';
import { getCourses } from '../actions'

import CourseItem from '../components/CourseItem';

import filter from 'lodash.filter'

function renderHeader() {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 20
      }}
    >
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="always"
        value={query}
        onChangeText={queryText => handleSearch(queryText)}
        placeholder="Search"
        style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
      />
    </View>
  );
}

class Home extends Component {

  state = {
    courses: []
  };

  handleSearch = (text) => {
    const formattedQuery = text.toLowerCase()
    const courses = filter(this.props.courses, course => {
      return this.contains(course, formattedQuery)
    })
    this.setState({ courses })
  }

  contains = ({ code, name, teacherID }, query) => {
    if (name.toLowerCase().includes(query) || code.toLowerCase().includes(query)) {
      return true
    }
    return false
  }


  componentDidMount() {
    this.props.dispatch(getCourses)
  }


  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.courses !== prevProps.courses) {
      this.setState({
        courses: this.props.courses
      });
    }
  }

  render() {

    const renderCourse = ({ item }) => (
      <CourseItem code={item.code} name ={item.name} navigation ={this.props.navigation } />
    );

    return (
    <View style={{padding: 10, paddingTop: 32}}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => { this.handleSearch(query) }}
        value={this.state.searchText}
      />
       <FlatList style={{marginBottom: 40}}
        data={this.state.courses}
        renderItem={renderCourse}
        keyExtractor={course => course.code}
        initialNumToRender ={6}
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

