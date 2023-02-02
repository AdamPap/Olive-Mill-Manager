import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {extendTheme, NativeBaseProvider} from 'native-base';
import React, {UIEventHandler} from 'react';

import CreateRoute from './src/screens/CreateRoute';
import Home from './src/screens/Home';
import ProfileScreen from './src/screens/ProfileScreen';

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
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{title: 'Olive Mill Manager'}}
            />
            <Stack.Screen
              name="CreateRoute"
              component={CreateRoute}
              // initialParams={{userId: 2}}
              options={{title: 'Προσθήκη Νέου Χωραφιού'}}
            />
            <Stack.Screen
              name="AllRoutes"
              component={AllRoutes}
              options={{title: 'All Routes'}}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </RealmProvider>
  );
};

export default App;
