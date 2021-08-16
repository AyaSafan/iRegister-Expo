import React from "react";

import { List, Divider } from "react-native-paper";

class AttendItem extends React.Component {
  render() {
    var attended = this.props.attendance.students.includes(
      this.props.student.uid
    );
    return (
        <List.Item
          key={this.props.student.uid}
          title={this.props.student.displayname}
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
    );
  }
}
export default AttendItem;
