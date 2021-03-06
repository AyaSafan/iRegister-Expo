import React from "react";

import { List, Divider } from "react-native-paper";

class AttendItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <List.Item
        key={this.props.key}
        title={this.props.student.displayname}
        description={this.props.student.id}
        right={(props) =>
          this.props.student.attended ? (
            <List.Icon
              {...props}
              icon="check-circle"
              color={"rgb(11, 184, 218)"}
            />
          ) : (
            <List.Icon {...props} icon="close-circle" color={"red"} />
          )
        }
        style={this.props.student.attended ? null : { opacity: 0.4 }}
      />
    );
  }
}
export default AttendItem;
