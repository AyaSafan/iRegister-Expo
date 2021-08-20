import React from "react";
import { styles } from "../styles";

import { Appbar, Divider, Drawer, Surface, List } from "react-native-paper";

import { connect } from "react-redux";
import { logout } from "../actions";

class More extends React.Component {
  constructor(props) {
    super(props);
  }

  logoutUser = () => {
    this.props.dispatch(logout).then(() => {
      this.props.navigation.navigate("Login");
    });
  };

  render() {
    return (
      <>
        <Appbar.Header>
          <Appbar.Content style={{ alignItems: "center" }} title="Settings" />
        </Appbar.Header>
        <Surface style={{ ...styles.surface, marginTop: 32 }}>
          <List.Item
            title={
              this.props.currentUser
                ? this.props.currentUser.displayname
                : "loading ..."
            }
            description={
              this.props.currentUser ? this.props.currentUser.id : "loading ..."
            }
            //left={(props) => <List.Icon {...props} icon="account" />}
          />

          <Drawer.Item
            icon="email"
            label={
              this.props.currentUser
                ? this.props.currentUser.email
                : "loading ..."
            }
          />

          <Divider />

          <Drawer.Item icon="logout" label="Logout" onPress={this.logoutUser} />
        </Surface>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(More);
