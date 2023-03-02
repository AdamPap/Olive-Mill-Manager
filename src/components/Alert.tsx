import {
  Box,
  Alert,
  Text,
  CloseIcon,
  HStack,
  IconButton,
  VStack,
} from 'native-base';
import React, {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

const CustomAlert: React.FC<Props> = ({children}) => {
  return (
    <Alert w="100%" status="success" variant="solid" bg="emerald.600">
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="white">
              {children}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            _focus={{
              borderWidth: 0,
            }}
            icon={<CloseIcon size="3" />}
            _icon={{
              color: 'white',
            }}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default CustomAlert;
