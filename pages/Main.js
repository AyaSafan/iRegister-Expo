import React, { Component } from 'react'; 
import { BottomNavigation } from 'react-native-paper';

import QRscan from './QRscan';
import Home from './Home';
import More from './More'


export default class Main extends Component {
  state = {
    index: 1,
    routes: [
      { key: 'more', title: 'More', icon: 'account-cog' },
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'qrscan', title: 'Scan', icon: 'camera' },
    ],
  };
    
  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    more: () => <More navigation={this.props.navigation}/>,
    home: () => <Home/>,
    qrscan: () => <QRscan/>,
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