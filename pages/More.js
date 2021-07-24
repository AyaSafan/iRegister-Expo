import React, { Component } from 'react'; 
import { Appbar } from 'react-native-paper';
import { List, Divider } from 'react-native-paper';
import { Drawer } from 'react-native-paper';

import { connect } from 'react-redux';
import {logout} from '../actions';


import firebase from 'firebase/app'
import "firebase/auth"
import {db} from '../App';




class More extends Component {    

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
      <List.Item
            title= {this.props.currentUser? this.props.currentUser.uid : ""}
            left={props => <List.Icon {...props} icon="account" />}
        />
        <List.Item
            title= {this.props.currentUser? this.props.info.displayname : ""}
            left={props => <List.Icon {...props} icon="account" />}
        />

      <List.Item
            title= {this.props.currentUser? this.props.currentUser.email : ""}
            left={props => <List.Icon {...props} icon="email" />}/>  

    <Divider />
    <Drawer.Item
     icon="logout"
     label="Logout"
     onPress={()=>{this.logoutUser()}}

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
//export default More;
