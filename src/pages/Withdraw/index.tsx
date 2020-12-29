import React, { createContext, useState } from 'react';
import { Container } from './styles';

import Switcher from '../../components/Switcher';

import PriceSelector from './pages/PriceSelector';
import Confirmation from './pages/Confirmation';

interface WithDrawContextProps {
  price: number,
  setPrice: (value: number) => void
}

export const WithDrawContext = createContext<WithDrawContextProps>({} as WithDrawContextProps);

const Withdraw: React.FC = () => {
  const [price, setPrice] = useState<number>(0);

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
