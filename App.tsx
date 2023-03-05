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
import YardManagement from './src/screens/YardManagement';
import EditField from './src/screens/EditField';
import {Field} from './src/models/Field';
import {BSON} from 'realm';
const {RealmProvider} = RealmContext;

export type RootStackParamList = {
  Home: undefined;
  AllRoutes: undefined;
  CreateRoute: undefined;
  Profile: undefined;
  YardManagement: undefined;
  EditField: {fieldId: BSON.ObjectId};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const customTheme = extendTheme({
  components: {
    Heading: {
      baseStyle: () => {
        return {
          color: 'darkBlue.800',
        };
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 'full',
      },
    },
    IconButton: {
      baseStyle: () => {
        return {
          borderRadius: 'full',
        };
      },
    },
    Input: {
      baseStyle: () => {
        return {
          rounded: 'lg',
          bg: 'warmGray.300',
        };
      },
    },
  },

  config: {
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
});

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
            <Stack.Screen name="YardManagement" component={YardManagement} />
            <Stack.Screen name="EditField" component={EditField} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </RealmProvider>
  );
};

export default App;
