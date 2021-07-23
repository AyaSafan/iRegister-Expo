import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider, Appbar, Menu , Text} from 'react-native-paper';

import LoginPage from './pages/LoginPage';


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

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


  return (
    <Appbar.Header >
      {previous && title != "Home"? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title= {title != "Home" ? title : "iRegister"}  />
     {/*
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon={MORE_ICON} color="white" onPress={openMenu} />
          }>

          {title != "Home"?  <Menu.Item onPress={()=>navigation.navigate('Home')} title="Home" /> : null}
          <Menu.Item onPress={()=>{store.dispatch(logout());  navigation.navigate('Login')}} title="Logout" />          
         
        </Menu>*/}

    </Appbar.Header>
  );
}
class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
      );
  }
}

export default App;
