import {Icon, IconButton, useColorMode} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const ColorModeButton = () => {
  const {toggleColorMode, colorMode} = useColorMode();

  return (
    <IconButton
      icon={
        colorMode === 'light' ? (
          <Icon color="blueGray.900" size={5} as={Feather} name="moon" />
        ) : (
          <Icon color="yellow.300" size={5} as={Feather} name="sun" />
        )
      }
      onPress={toggleColorMode}
    />
  );
};

export default ColorModeButton;
