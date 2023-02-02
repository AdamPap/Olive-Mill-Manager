import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Box, Button} from 'native-base';
import React from 'react';
import {FlatList} from 'react-native';
import {RootStackParamList} from '../../App';

import {RealmContext} from '../models';
import {Field} from '../models/Field';
const {useRealm, useQuery} = RealmContext;

type Props = NativeStackScreenProps<RootStackParamList, 'AllRoutes'>;

const AllRoutes = ({route, navigation}: Props) => {
  const fields = useQuery(Field);
  return (
    <Box p={4}>
      <Box my={3}>
        <Button
          onPress={() => {
            navigation.navigate('CreateRoute');
          }}
          textTransform="uppercase">
          Προσθήκη Νέου Χωραφιού
        </Button>
      </Box>

      <Box>
        <FlatList
          data={fields}
          keyExtractor={field => field.id.toString()}
          renderItem={({item}) => <Box>{item.fieldName}</Box>}
        />
      </Box>
    </Box>
  );
};

export default AllRoutes;
