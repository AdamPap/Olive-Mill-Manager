import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({route, navigation}: Props) => {
  return (
    <Box style={styles.container}>
      <Text>Profile Screen</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b9dddf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
