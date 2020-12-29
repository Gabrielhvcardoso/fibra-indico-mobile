import React from 'react';

import { AuthContextProvider } from './auth';
import { DataContextProvider } from './data';

const Context: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        { children }
      </DataContextProvider>
    </AuthContextProvider>
  );
};

export default Context;
