import {Box} from 'native-base';
import React, {ReactNode} from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <>
      <Box m={4} p={4}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
