import React, { Component } from 'react'; 
import { Appbar } from 'react-native-paper';
import { Divider } from 'react-native-paper';
import { Drawer } from 'react-native-paper';


import { connect } from 'react-redux';
import {logout} from '../actions';


import firebase from 'firebase/app'
import "firebase/auth"



class More extends Component {

  constructor(props) {
    super(props);
  }

  logoutUser = () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.props.dispatch(logout());
            this.props.navigation.navigate("Login");        
          });
  };   


  render() {
    return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>

        <Drawer.Item
        icon="account"
        label= {this.props.info? this.props.info.displayname : "loading ..."}
        />
          
        <Drawer.Item
        icon="email"
        label= {this.props.currentUser? this.props.currentUser.email : "loading ..."}
        />

        <Divider />

        <Drawer.Item
        icon="logout"
        label="Logout"
        onPress={this.logoutUser}
        />

    </>
    );
  }
}

const mapStateToProps = state => {
    return {currentUser: state.currentUser, info: state.info}
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(More)
