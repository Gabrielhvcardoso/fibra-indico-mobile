import React, { useContext, useMemo } from 'react';
import Button from '../../../../components/Button';
import { Container, PriceInput, Text } from './styles';

import AuthContext from '../../../../context/auth';

import { ChildProps } from '../../../../components/Switcher';
import { WithDrawContext } from '../../index';
import { currencyFormat } from '../../../../utils';

const PriceSelector: React.FC<ChildProps> = ({ moveToIndex }) => {
  const { current } = useContext(AuthContext);
  const { price, setPrice } = useContext(WithDrawContext);

  const error = useMemo<boolean>(() => price === 0, [price]);

  if (!moveToIndex || !current) return <></>;

  return (
    <Container>
      <Text
        style={{ fontFamily: 'WorkSans Medium', fontSize: 26 }}
      >Quanto você quer sacar da sua conta?</Text>
      <PriceInput
        value={currencyFormat(price, true)}
        keyboardType="number-pad"
        onChangeText={(value: string) => {
          let unformatted = parseFloat(currencyFormat(value, true).substring(3).replace('.', '').replace(',', '.'));
          unformatted = unformatted > current.account ? current.account : unformatted;
          setPrice(unformatted);
        }}
      />
      <Text
        style={{ color: error ? 'red' : 'black' }}
      >
        {
          error
            ? 'Insira um valor válido'
            : `Saldo disponível: ${currencyFormat(current.account, true)}`
        }
      </Text>

      <Button
        disabled={error}
        style={{ marginTop: 30 }}
        onPress={() => moveToIndex(1)}
      >Confirmar</Button>
    </Container>
  );
};

export default PriceSelector;
