import React, { Component } from 'react'; 
import {StyleSheet,  View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { connect } from 'react-redux';

import {db} from '../App';

class Home extends Component {
  state = {
    searchText: '',
    courses: []
  };

  async getCourses() {    
    const snapshot = await db.collection("courses").get()
    const courses = snapshot.docs.map(doc => doc.data());  
    this.setState({ courses });
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
       <View style={styles.container}>
       { this.state.courses.map((course, index) => (
        <View key={index}>
          <Text>{ course.code }</Text>
        </View>
        ))}
       
       </View>
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
  });


const mapStateToProps = state => {
    return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(Home)

//export default Home;