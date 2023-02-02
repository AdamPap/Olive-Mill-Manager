import {
  ArrowForwardIcon,
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
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
    <Box bgColor="white" shadow="lg" borderRadius="md" mb={2} p={2}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box w="80%">
          <Heading size="md">{field.fieldName}</Heading>
          <Text>{field.ownerName}</Text>
        </Box>
        <Flex alignItems="flex-end" justifyContent="center">
          <IconButton
            variant="solid"
            // bgColor="primary.300"
            icon={<Icon size={5} as={Entypo} name="direction" />}
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
};

export default FieldCard;
