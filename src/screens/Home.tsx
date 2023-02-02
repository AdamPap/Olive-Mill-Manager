import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Button, VStack} from 'native-base';
import React from 'react';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({route, navigation}: Props) => {
  return (
    <Box mt={4} p={4}>
      <VStack space={4}>
        <Button
          colorScheme="coolGray"
          onPress={() => {
            navigation.navigate('AllRoutes');
          }}
          size="lg">
          Έναρξη Δρομολογίου
        </Button>
        <Button
          colorScheme="coolGray"
          onPress={() => {
            navigation.navigate('CreateRoute');
          }}
          size="lg">
          Προσθήκη χωραφιού
        </Button>
        <Button colorScheme="coolGray" size="lg">
          Διαχείριση Αυλής
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;
