import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Icon, VStack} from 'native-base';
import React from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../../App';
import Layout from '../components/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({route, navigation}: Props) => {
  return (
    <Layout>
      <VStack space={4}>
        <Button
          borderRadius="full"
          leftIcon={<Icon size={7} as={MCI} name="road-variant" mr={5} />}
          colorScheme="darkBlue"
          onPress={() => {
            navigation.navigate('AllRoutes');
          }}
          size="lg">
          Έναρξη Δρομολογίου
        </Button>
        <Button
          borderRadius="full"
          leftIcon={
            <Icon
              alignSelf="flex-start"
              size={7}
              as={MCI}
              name="map-plus"
              mr={5}
            />
          }
          colorScheme="darkBlue"
          onPress={() => {
            navigation.navigate('CreateRoute');
          }}
          size="lg">
          Προσθήκη Xωραφιού
        </Button>
        <Button
          borderRadius="full"
          leftIcon={
            <Icon
              alignSelf="flex-start"
              size={7}
              as={MCI}
              name="clipboard-edit-outline"
              mr={5}
            />
          }
          colorScheme="darkBlue"
          // onPress={() => {
          //   navigation.navigate('CreateRoute');
          // }}
          size="lg">
          Διαχείριση Αυλής
        </Button>
      </VStack>
    </Layout>
  );
};

export default Home;
