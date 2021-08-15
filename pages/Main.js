import React from 'react'; 

import { BottomNavigation } from 'react-native-paper';

import QRscan from './QRscan';
import QRcreate from './QRcreate';
import Home from './Home';
import More from './More'

import { connect } from 'react-redux';

class Main extends React.Component {
  state = {
    index: 1,
    routes: [
      { key: 'more', title: 'More', icon: 'account-cog' },
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'qrscan', title: 'QR', icon: this.props.currentUser.role == "teacher"? 'qrcode-edit': 'qrcode-scan' },
    ],
  };
    
  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    more: () => <More navigation={this.props.navigation}/>,
    home: () => <Home navigation={this.props.navigation}/>,
    qrscan: () => this.props.currentUser.role == 'teacher' ? <QRcreate/> : <QRscan/>,
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

const mapStateToProps = state => {
  return {currentUser: state.currentUser}
}

export default connect(mapStateToProps)(Main)