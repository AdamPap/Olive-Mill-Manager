import {Box, Heading, Input, Icon, Divider} from 'native-base';
import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback, Keyboard, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FieldCard from '../components/FieldCard';
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

  const keyExtractor = (place: Place) => place.id.toString();

  const ITEM_HEIGHT = 65; // fixed height of item component
  const getItemLayout = (_: any, index: number) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  };

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

            <Box flex={1} mt={3}>
              {/* TODO: swap flatlist with flash-list or recyclerlistview */}
              <FlatList
                data={places.filter(
                  place =>
                    place.placeNumber
                      .toString()
                      .includes(inputValue.toLowerCase()) ||
                    place.ownerName
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()),
                )}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                contentContainerStyle={{paddingBottom: 40}}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
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
