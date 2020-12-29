import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { User } from '../types/User';

type PossibleUser = User | null;

interface AuthContextProps {
  current: PossibleUser,
  authenticate: (user: PossibleUser) => Promise<void>
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [current, setCurrent] = useState<PossibleUser>(null);

  useEffect(() => {
    const findUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) setCurrent(JSON.parse(user));
    };

    findUser();
  }, []);

  const authenticate = async (user: PossibleUser) => {
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setCurrent(user);
    } else {
      await AsyncStorage.removeItem('user');
      setCurrent(null);
    }
  };

  return (
    <AuthContext.Provider value={{ current, authenticate }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
