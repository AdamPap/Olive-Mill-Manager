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
import {Place} from '../models/Place';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({place}: PlaceCardProps) => {
  return (
    // TODO: on press open edit screen with a delete button
    <Pressable onPress={() => console.log('PRESSED')}>
      {({isPressed}) => {
        return (
          <Box
            bgColor={isPressed ? 'warmGray.400' : 'warmGray.300'}
            borderRadius="md"
            mb={2}
            mr={2}
            p={3}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center">
              <Box mr={5}>
                <Text color="darkBlue.800" fontWeight="bold" fontSize="3xl">
                  {place.placeNumber}
                </Text>
              </Box>
              <Box flexGrow={2}>
                <Heading size="md">
                  {place.ownerName ? place.ownerName : '-'}
                </Heading>
                <Text>Τσουβάλια: {place.numberOfBags}</Text>
              </Box>
              <Flex alignItems="flex-end" justifyContent="center">
                <IconButton
                  bg="emerald.600"
                  _pressed={{bg: 'darkBlue.900'}}
                  icon={
                    <Icon
                      color="warmGray.200"
                      size={5}
                      as={Entypo}
                      name="edit"
                    />
                  }
                  onPress={() => {
                    // TODO: handle google maps open
                    console.log('Directions on google maps');
                  }}
                />
              </Flex>
            </Flex>
          </Box>
        );
      }}
    </Pressable>
  );
};

export default PlaceCard;
