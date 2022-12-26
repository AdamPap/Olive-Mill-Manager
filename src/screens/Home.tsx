import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Button, Image, Text, VStack} from 'native-base';
import React from 'react';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({route, navigation}: Props) => {
  return (
    <Box mt={4} p={4}>
      <VStack space={4}>
        <Button
          onPress={() => {
            navigation.navigate('CreateRoute');
          }}
          size="lg">
          Έναρξη Νέου Δρομολογίου
        </Button>
        <Button size="lg">Εύρεση Δρομολογίου</Button>
      </VStack>
    </Box>
  );
};

export default Home;
