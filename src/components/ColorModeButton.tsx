import {Icon, IconButton, useColorMode} from 'native-base';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const ColorModeButton = () => {
  const {toggleColorMode, colorMode} = useColorMode();

  return (
    <IconButton
      icon={
        colorMode === 'light' ? (
          <Icon color="darkBlue.800" size={6} as={Feather} name="moon" />
        ) : (
          <Icon color="yellow.500" size={6} as={Feather} name="sun" />
        )
      }
      onPress={() => {
        console.log(colorMode);
        toggleColorMode();
      }}
    />
  );
};

export default ColorModeButton;
