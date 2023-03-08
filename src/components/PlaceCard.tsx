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
import React, {memo, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {Place} from '../models/Place';
import PlaceEditModal from './modals/PlaceEditModal';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({place}: PlaceCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    setShowModal(true);
  };

  return (
    <Pressable onPress={handlePress}>
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
                <Text
                  color={place.ownerName ? 'darkBlue.800' : 'warmGray.600'}
                  fontWeight="bold"
                  fontSize="3xl">
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
                <Text color="warmGray.500" fontSize="xs">
                  {place.updatedAt.toLocaleDateString('el-GR')}
                </Text>
                <Text color="warmGray.500" fontSize="xs">
                  {place.updatedAt.toLocaleTimeString('el-GR', {hour12: false})}
                </Text>
              </Flex>
              {/* <Flex alignItems="flex-end" justifyContent="center">
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
                  onPress={handlePress}
                />
              </Flex> */}
            </Flex>
            <PlaceEditModal
              place={place}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </Box>
        );
      }}
    </Pressable>
  );
};

export default memo(PlaceCard);
