import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {extendTheme, NativeBaseProvider} from 'native-base';
import React from 'react';

import CreateRoute from './src/screens/CreateRoute';
import Home from './src/screens/Home';
import ProfileScreen from './src/screens/ProfileScreen';

import AppBar from './src/components/AppBar';
import {RealmContext} from './src/models';
import AllRoutes from './src/screens/AllRoutes';
const {RealmProvider} = RealmContext;

export type RootStackParamList = {
  Home: undefined;
  AllRoutes: undefined;
  CreateRoute: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const config = {
  useSystemColorMode: false,
};

const customTheme = extendTheme(config);

const App = () => {
  return (
    <RealmProvider>
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: props => <AppBar title={props.route.name} {...props} />,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CreateRoute" component={CreateRoute} />
            <Stack.Screen name="AllRoutes" component={AllRoutes} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </RealmProvider>
  );
};

export default App;
