import React from "react";
import { styles } from "../styles";

import { View, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";

import filter from "lodash.filter";

import CourseItem from "../components/CourseItem";
import { getCourses } from "../actions";

import { connect } from "react-redux";

class Home extends React.Component {
  state = {
    courses: [],
  };

  handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const courses = filter(this.props.courses, (course) => {
      return this.contains(course, formattedQuery);
    });
    this.setState({ courses });
  };

  contains = (course, query) => {
    if (
      course.name.toLowerCase().includes(query) ||
      course.code.toLowerCase().includes(query)
    ) {
      return true;
    }
    return false;
  };

  componentDidMount() {
    this.props.dispatch(getCourses);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.courses !== prevProps.courses) {
      this.setState({
        courses: this.props.courses,
      });
    }
  }

  render() {
    const renderCourse = ({ item }) => (
      <CourseItem
        code={item.code}
        name={item.name}
        navigation={this.props.navigation}
      />
    );

    return (
      <View style={styles.container}>
        <Searchbar
          style={{ margin: 10, marginTop: 32 }}
          placeholder="Search"
          onChangeText={(query) => {
            this.handleSearch(query);
          }}
        />
        {this.state.courses?
        <FlatList
          data={this.state.courses}
          renderItem={renderCourse}
          keyExtractor={(course) => course.code}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        :null}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
