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

  constructor(props) {
    super(props);
  }
  
  state = {
    users: []
  };

  async getUsers() {    
    const snapshot = db.collection("users").get()
    const users = snapshot.docs.map(doc => doc.data());  
    this.setState({ users });
  }

  async componentDidMount() {
    this.getUsers();
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
      <List.Item
            title= {this.props.currentUser? this.props.currentUser.uid : ""}
            left={props => <List.Icon {...props} icon="account" />}
        />
        <List.Item
            title= {this.props.users? this.props.users[0].displayname : ""}
            left={props => <List.Icon {...props} icon="account" />}
        />
      
    <Drawer.Item
     icon="email"
     label= {this.props.currentUser? this.props.currentUser.email : ""}
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
//export default More;
