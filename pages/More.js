import React, { Component } from 'react'; 
import { StyleSheet} from 'react-native';
import { Appbar, Divider, Drawer , Surface} from 'react-native-paper';


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
      <Appbar.Header >
        <Appbar.Content  style={{ alignItems: 'center' }}  title="Settings" />
      </Appbar.Header>
      <Surface style={styles.surface}>
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
      </Surface>
    </>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    padding: 15,
    margin: 8,
    marginHorizontal: 15,
    elevation: 4,
    borderRadius: 8,

    marginTop: 32
  },
  textmuted:{
    color: '#6c757d'
  }
});
const mapStateToProps = state => {
    return {currentUser: state.currentUser, info: state.info}
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(More)
