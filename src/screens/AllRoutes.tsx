import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Button, Divider, Heading, Icon, Input} from 'native-base';
import React, {useState} from 'react';
import {FlatList, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {RootStackParamList} from '../../App';
import FieldCard from '../components/FieldCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Layout from '../components/Layout';

import {RealmContext} from '../models';
import {Field} from '../models/Field';
const {useRealm, useQuery} = RealmContext;

type Props = NativeStackScreenProps<RootStackParamList, 'AllRoutes'>;

const AllRoutes = ({route, navigation}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const fields = useQuery(Field);

  const handleChange = (text: string) => setInputValue(text);

  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              placeholder="Όνομα χωραφιού ή ιδιοκτήτη"
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

          {/* TODO: check flatlist bug where last elements not showing unless
            flex={1} in all flatlsit parent View containers and padding on bottom
          */}
          <Box mt={3} flex={1}>
            <FlatList
              data={fields.filter(
                field =>
                  field.fieldName
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  field.ownerName
                    .toLowerCase()
                    .includes(inputValue.toLowerCase()),
              )}
              keyExtractor={field => field.id.toString()}
              contentContainerStyle={{paddingBottom: 40}}
              renderItem={({item}) => <FieldCard field={item} />}
            />
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

export default AllRoutes;
