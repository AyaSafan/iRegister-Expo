import React from 'react';

import {View } from 'react-native';
import { List, Divider } from 'react-native-paper';

import { connect } from 'react-redux';

class DateItem extends React.Component {

    constructor(props) {
        super(props);
      }

navigate = () => this.props.navigation.navigate('AttendanceList', {code: this.props.code, attendance: this.props.attendance})
        
render() {
    return (
        <View>
        {this.props.currentUser.role == "teacher"?
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

const mapStateToProps = state => {
    return {currentUser: state.currentUser}
}
  
export default connect(mapStateToProps)(DateItem)