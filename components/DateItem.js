import React from "react";

import { View } from "react-native";
import { List } from "react-native-paper";

import { connect } from "react-redux";

class DateItem extends React.Component {
  constructor(props) {
    super(props);
  }

  navigate = () =>
    this.props.navigation.navigate("AttendanceList", {
      code: this.props.code,
      attendance: this.props.attendance,
    });

  render() {
    var attended = this.props.attendance.students.includes(
      this.props.currentUser.uid
    );
    return (
      <View key={this.props.key}>
        {this.props.currentUser.role == "teacher" ? (
          <List.Item
            title={this.props.attendance.date}
            left={(props) => <List.Icon {...props} icon="calendar" />}
            onPress={() =>
              this.props.navigation.navigate("AttendanceList", {
                code: this.props.code,
                attendance: this.props.attendance,
              })
            }
          />
        ) : (
          <List.Item
            title={this.props.attendance.date}
            left={(props) => <List.Icon {...props} icon="calendar" />}
            right={(props) =>
              attended ? (
                <List.Icon
                  {...props}
                  icon="check-circle"
                  color={"rgb(11, 184, 218)"}
                />
              ) : (
                <List.Icon {...props} icon="close-circle" color={"red"} />
              )
            }
            style={attended ? null : { opacity: 0.4 }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps)(DateItem);
