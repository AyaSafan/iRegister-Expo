import React, { Component } from 'react';
import { List, Divider } from 'react-native-paper';
import {View } from 'react-native';

import { connect } from 'react-redux';

class DateItem extends Component {

    constructor(props) {
        super(props);
      }

navigate = () => this.props.navigation.navigate('AttendanceList', {code: this.props.code, attendance: this.props.attendance})
        
render() {
    return (
        <View>
        {this.props.info.role == "teacher"?
        <List.Item
            title={this.props.attendance.date}
            left={props => <List.Icon {...props} icon="calendar" />}
            onPress={() => this.props.navigation.navigate('AttendanceList', {code: this.props.code, attendance: this.props.attendance})}
        />
        : 
        <List.Item
            title={this.props.attendance.date}
            left={props => <List.Icon {...props} icon="calendar" />}
            right={props => this.props.attendance.students.includes(this.props.currentUser.uid) ? <List.Icon {...props} icon="check-circle" color={"rgb(11, 184, 218)"}/>: <List.Icon {...props} icon="close-circle" color={"red"}/>}
            style={this.props.attendance.students.includes(this.props.currentUser.uid) ? null: {opacity: 0.4}}
        />}
        <Divider />
        </View>
    );
};

}
//export default DateItem;
const mapStateToProps = state => {
    return {currentUser: state.currentUser, info: state.info}
}
  
export default connect(mapStateToProps)(DateItem)