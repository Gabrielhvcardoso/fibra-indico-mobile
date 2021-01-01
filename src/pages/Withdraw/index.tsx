import React, { createContext, useContext, useEffect, useState } from 'react';
import { Container } from './styles';

import Switcher from '../../components/Switcher';

import PriceSelector from './pages/PriceSelector';
import Confirmation from './pages/Confirmation';
import { useFetch } from '../../hooks';
import AuthContext from '../../context/auth';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

interface WithDrawContextProps {
  price: number,
  setPrice: (value: number) => void
}

export const WithDrawContext = createContext<WithDrawContextProps>({} as WithDrawContextProps);

const Withdraw: React.FC = () => {
  const { current } = useContext(AuthContext);
  const [price, setPrice] = useState<number>(0);

  const navigation = useNavigation();

  useEffect(() => {
    if (current) {
      const { secret, token } = current;
      useFetch.get(`/u/a/${token}/${secret}`, (response) => {
        console.log(response);
        if (!response || response.code === 'error') {
          Alert.alert('Atenção', 'Defina um método de saque nas configurações antes de fazer um pedido', [{ text: 'Ok', onPress: () => navigation.goBack() }]);
        }
      });
    }
  }, []);

  return (
    <Container>
      <WithDrawContext.Provider value={{ price, setPrice }}>
        <Switcher>
          <PriceSelector />
          <Confirmation />
        </Switcher>
      </WithDrawContext.Provider>
    </Container>
  );
};

export default Withdraw;
