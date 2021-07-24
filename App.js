import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider, Appbar, Menu , Text} from 'react-native-paper';

import { Provider } from 'react-redux';
import store from './store';

import Loading from './pages/Loading';
import Login from './pages/Login';
import LoadingMain from './pages/LoadingMain'
import Main from './pages/Main';

import firebase from 'firebase/app'
import 'firebase/firestore';

import { LogBox } from 'react-native'
LogBox.ignoreLogs([
  'Require cycle:', 'Setting a timer'
])


var firebaseConfig = {
  apiKey: "AIzaSyC94dXTd5hAp-VWqIFB1T4vwLhS83yqe-0",
  authDomain: "iregister-expo.firebaseapp.com",
  projectId: "iregister-expo",
  storageBucket: "iregister-expo.appspot.com",
  messagingSenderId: "272179835846",
  appId: "1:272179835846:web:d41397e354364363fe78c7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#cc3300',
    accent: "#eea29a"
  },
};

function CustomNavigationBar({ scene, navigation, previous }) {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;


  return (
    <Provider store={store}> 
    <Appbar.Header >
      {previous && title != "Home"? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title= {title != "Home" ? title : "iRegister"}  />
    </Appbar.Header>
    </Provider>
  );
}




class App extends React.Component {

  
  render() {
    return (
      <Provider store={store}> 
      <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoadingMain"
            component={LoadingMain}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}            
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
       </Provider>
      );
  }
}

export default App;
