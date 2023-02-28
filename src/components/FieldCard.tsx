import {
  ArrowForwardIcon,
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Pressable,
  Text,
} from 'native-base';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {Field} from '../models/Field';

interface FieldCardProps {
  field: Field;
}

const FieldCard = ({field}: FieldCardProps) => {
  return (
    // TODO: on press open edit screen with a delete button
    <Pressable onPress={() => console.log('PRESSED')}>
      {({isPressed}) => {
        return (
          <Box
            bgColor={isPressed ? 'coolGray.100' : 'warmGray.300'}
            shadow="lg"
            borderRadius="md"
            mb={2}
            p={3}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}>
            <Flex flexDirection="row" justifyContent="space-between">
              <Box w="80%">
                <Heading size="md">{field.fieldName}</Heading>
                <Text>{field.ownerName}</Text>
              </Box>
              <Flex alignItems="flex-end" justifyContent="center">
                <IconButton
                  bg="darkBlue.800"
                  _pressed={{bg: 'darkBlue.900'}}
                  icon={
                    <Icon
                      color="warmGray.200"
                      size={5}
                      as={Entypo}
                      name="direction"
                    />
                  }
                  onPress={() => {
                    // TODO: handle google maps open
                    console.log('Directions on google maps');
                  }}
                />
              </Flex>
            </Flex>
            {/* <Box mt={2}>
        <Text>{`[ ${field.lng.toFixed(3)}, ${field.lat.toFixed(3)} ]`}</Text>
      </Box>

      {field.notes && field.notes.length > 0 && (
        <Text bg="red.300" mt={2}>
          {field.notes}
        </Text>
      )} */}
          </Box>
        );
      }}
    </Pressable>
  );
};

export default FieldCard;
