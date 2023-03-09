import {FlashList} from '@shopify/flash-list';
import {Box, Divider, Flex, Heading, Icon, Input} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Layout from '../components/Layout';
import PlaceCard from '../components/PlaceCard';

import {RealmContext} from '../models';
import {Place} from '../models/Place';
const {useQuery, useRealm} = RealmContext;

const YardManagement = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const realm = useRealm();
  useEffect(() => {
    const places = realm.objects(Place);
    console.log('PLACES LENGTH: ', places.length);
    if (places.length > 1) {
      setIsLoading(false);
    } else {
      console.log('Writing new data');
      realm.write(() => {
        for (let i = 0; i < 50; i++) {
          realm.create('Place', Place.generate(i + 1, '', 0));
        }
      });

      setIsLoading(false);
    }
  }, []);

  const places = useQuery(Place);

  const handleChange = (text: string) => setInputValue(text);

  const renderItem = ({item}: {item: Place}) => <PlaceCard place={item} />;

  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {!isLoading ? (
          <Box p={4} flex={1}>
            <Box mb={4}>
              <Heading mb={2} size="md">
                Aναζήτηση
              </Heading>
              <Input
                fontSize="sm"
                value={inputValue}
                onChangeText={handleChange}
                variant="outline"
                placeholder="Νούμερο θέσης ή όνομα ιδιοκτήτη"
                InputRightElement={
                  <Icon
                    size={5}
                    mr={2}
                    color="warmGray.400"
                    as={<MaterialIcons name="search" />}
                  />
                }
              />
            </Box>

            <Divider />

            <Box flex={1} mt={3} pb={10}>
              <FlashList
                data={places.filter(
                  place =>
                    place.placeNumber
                      .toString()
                      .includes(inputValue.toLowerCase()) ||
                    place.ownerName
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()),
                )}
                renderItem={renderItem}
                estimatedItemSize={100}
                ListEmptyComponent={<Flex>List is Empty</Flex>}
              />
            </Box>
          </Box>
        ) : (
          <Box>Loading ...</Box>
        )}
      </TouchableWithoutFeedback>
    </Layout>
  );
};

export default YardManagement;
