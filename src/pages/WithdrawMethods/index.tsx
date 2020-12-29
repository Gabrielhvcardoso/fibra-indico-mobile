import React, { useState } from 'react';
import { Container } from './styles';
import RadioGroup, { RadioItem } from '../../components/RadioGroup';

import BankAccount from './components/BankAccount';
import PicPay from './components/PicPay';
import Pix from './components/Pix';

const WithdrawMethods: React.FC = () => {
  const [method, setMethod] = useState<number | string>(1);

  return (
    <Container>
      <RadioGroup value={method} onValueChange={(value) => setMethod(value)} >
        <RadioItem value={1}>Conta bancária (DOC e TED)</RadioItem>
        <RadioItem value={2}>PicPay</RadioItem>
        <RadioItem value={3}>Pix</RadioItem>
      </RadioGroup>

      {
        method === 1
          ? <BankAccount />
          : method === 2
            ? <PicPay />
            : <Pix />
      }
    </Container>
  );
};

export default WithdrawMethods;
