import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  StatusBar,
  useColorModeValue,
} from 'native-base';
import React from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorModeButton from './ColorModeButton';

type AppBarProps = NativeStackHeaderProps & {title: string};

// Needed to accept key as string
interface TitleInterface {
  [key: string]: string;
}

// Mapping to add spaces
const titles: TitleInterface = {
  Home: 'Olive Mill Manager',
  AllRoutes: 'All Routes',
  CreateRoute: 'Create Route',
  Profile: 'Profile',
};

const AppBar: React.FC<AppBarProps> = ({navigation, back, title}) => {
  return (
    <HStack
      bg="warmGray.200"
      h={16}
      alignItems="center"
      borderBottomWidth={1}
      borderBottomColor="warmGray.300">
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop bg="warmGray.200" />
      <Box width="15%">
        {back && (
          <IconButton
            icon={
              <Icon
                color="darkBlue.800"
                size={8}
                as={MCI}
                name="chevron-left"
              />
            }
            onPress={navigation.goBack}
          />
        )}
      </Box>
      <Box width="70%">
        <Heading textAlign="center">{titles[title]}</Heading>
      </Box>
    </HStack>
  );
};

export default AppBar;
