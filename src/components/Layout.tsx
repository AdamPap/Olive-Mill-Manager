import {Box, useColorModeValue} from 'native-base';
import React, {ReactNode} from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <Box bg="warmGray.200" p={4} minHeight="100%">
      {children}
    </Box>
  );
};

export default Layout;
