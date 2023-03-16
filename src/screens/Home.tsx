import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Icon, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../../App';
import Layout from '../components/Layout';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({route, navigation}: Props) => {
  return (
    <Layout>
      <VStack space={4}>
        <Pressable
          bg="darkBlue.800"
          rounded="full"
          py={3}
          px={10}
          display="flex"
          flexDirection="row"
          alignItems="center"
          _pressed={{bg: 'darkBlue.900'}}
          onPress={() => {
            navigation.navigate('AllRoutes');
          }}>
          <Icon mr={6} color="white" size={8} as={MCI} name="road-variant" />
          <Text flex="1" textAlign="center" fontSize="md" color="white">
            Έναρξη Δρομολογίου
          </Text>
        </Pressable>
        <Pressable
          bg="darkBlue.800"
          rounded="full"
          py={3}
          px={10}
          display="flex"
          flexDirection="row"
          alignItems="center"
          _pressed={{bg: 'darkBlue.900'}}
          onPress={() => {
            navigation.navigate('CreateRoute');
          }}>
          <Icon mr={6} color="white" size={8} as={MCI} name="map-plus" />
          <Text flex="1" textAlign="center" fontSize="md" color="white">
            Προσθήκη Xωραφιού
          </Text>
        </Pressable>
        <Pressable
          bg="darkBlue.800"
          rounded="full"
          py={3}
          px={10}
          display="flex"
          flexDirection="row"
          alignItems="center"
          _pressed={{bg: 'darkBlue.900'}}
          onPress={() => {
            navigation.navigate('YardManagement');
          }}>
          <Icon
            mr={6}
            color="white"
            size={8}
            as={MCI}
            name="clipboard-edit-outline"
          />
          <Text flex="1" textAlign="center" fontSize="md" color="white">
            Διαχείριση Αυλής
          </Text>
        </Pressable>
        {/* <Pressable
          bg="darkBlue.800"
          rounded="full"
          py={3}
          px={10}
          display="flex"
          flexDirection="row"
          alignItems="center"
          _pressed={{bg: 'darkBlue.900'}}
          onPress={() => {
            navigation.navigate('YardManagement');
          }}>
          <Icon
            mr={6}
            color="white"
            size={8}
            as={MCI}
            name="calendar-clock-outline"
          />
          <Text flex="1" textAlign="center" fontSize="md" color="white">
            Πρόγραμμα Αλεσμάτων
          </Text>
        </Pressable> */}
      </VStack>
    </Layout>
  );
};

export default Home;
