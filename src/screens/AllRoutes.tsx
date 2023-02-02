import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Button, Divider, Heading, Icon, Input} from 'native-base';
import React, {useState} from 'react';
import {FlatList, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {RootStackParamList} from '../../App';
import FieldCard from '../components/FieldCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RealmContext} from '../models';
import {Field} from '../models/Field';
const {useRealm, useQuery} = RealmContext;

type Props = NativeStackScreenProps<RootStackParamList, 'AllRoutes'>;

const AllRoutes = ({route, navigation}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const fields = useQuery(Field);

  const handleChange = (text: string) => setInputValue(text);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Box p={4}>
        <Box mb={4}>
          <Heading mb={2} size="md">
            Aναζήτηση
          </Heading>
          <Input
            value={inputValue}
            onChangeText={handleChange}
            borderRadius={5}
            variant="outline"
            placeholder="Όνομα χωραφιού ή ιδιοκτήτη"
            bg="white"
            InputRightElement={
              <Icon
                size={5}
                mr={2}
                color="muted.300"
                as={<MaterialIcons name="search" />}
              />
            }
          />
        </Box>

        <Divider />

        <Box mt={3}>
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
            renderItem={({item}) => <FieldCard field={item} />}
          />
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default AllRoutes;
