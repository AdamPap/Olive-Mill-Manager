import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {Box, Heading, HStack, Icon, IconButton, StatusBar} from 'native-base';
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
    <HStack h={16} justifyContent="space-between" alignItems="center" pr={4}>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <Box p={back ? 0 : 8}>
        {back && (
          <IconButton
            icon={<Icon size={10} as={MCI} name="chevron-left" />}
            onPress={navigation.goBack}
          />
        )}
      </Box>
      <Box flexGrow={1}>
        <Heading textAlign="center">{titles[title]}</Heading>
      </Box>
      <Box ml="auto">
        <ColorModeButton />
      </Box>
    </HStack>
  );
};

export default AppBar;
