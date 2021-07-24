import React, { Component } from 'react'; 
import { BottomNavigation, Text } from 'react-native-paper';

import QRscan from './QRscan';
import Home from './Home';
import More from './More'

const MoreRoute = () => <More/>;
const HomeRoute = () => <Home/>;
const QRscanRoute = () => <QRscan/>;

import firebase from 'firebase/app'
import "firebase/auth"

export default class Main extends Component {
  state = {
    index: 1,
    routes: [
      { key: 'more', title: 'More', icon: 'account-cog' },
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'qrscan', title: 'Scan', icon: 'camera' },
    ],
    currentUser: null };
    
    componentDidMount() {
        const currentUser  = firebase.auth().currentUser;
        this.setState({ currentUser });
    }

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    more: MoreRoute,
    home: HomeRoute,
    qrscan: QRscanRoute,
  });

  render() {

    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}

        labeled={false}
      />
    );
  }
}