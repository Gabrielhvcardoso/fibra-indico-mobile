import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useFetch } from '../hooks';
import { User } from '../types/User';

type PossibleUser = User & { password: string } | null;

interface AuthContextProps {
  current: PossibleUser,
  authenticate: (user: PossibleUser) => Promise<void>,
  refreshUserData: () => Promise<void>
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [current, setCurrent] = useState<PossibleUser>(null);

  const authenticate = async (user: PossibleUser) => {
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setCurrent(user);
    } else {
      await AsyncStorage.removeItem('user');
      setCurrent(null);
    }
  };

  const refreshUserData = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      useFetch.get(`/u/${JSON.parse(user).token}`, (response) => {
        if (response.code === 'success') {
          authenticate(response.user);
        } else {
          authenticate(null);
        }
      });
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ current, authenticate, refreshUserData }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
