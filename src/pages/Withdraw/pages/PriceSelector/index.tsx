import React, { useContext, useEffect, useMemo, useState } from 'react';
import Button from '../../../../components/Button';
import { Container, PriceInput, Text } from './styles';

import AuthContext from '../../../../context/auth';

import { ChildProps } from '../../../../components/Switcher';
import { WithDrawContext } from '../../index';
import { currencyFormat } from '../../../../utils';
import { useFetch } from '../../../../hooks';
import { WithdrawOrder } from '../../../../types/WithdrawOrder';

const PriceSelector: React.FC<ChildProps> = ({ moveToIndex }) => {
  const { current } = useContext(AuthContext);
  const { price, setPrice } = useContext(WithDrawContext);

  const [pendentPayments, setPendentPayments] = useState<number>(0);
  const [firstType, setFirstType] = useState<boolean>(false);

  const error = useMemo<boolean>(() => price === 0, [price]);

  if (!moveToIndex || !current) return <></>;

  useEffect(() => {
    useFetch.get(`/u/w/${current.token}`, (response: Array<WithdrawOrder>) => {
      const pending = response.filter(item => item.status === 'pending');

      if (pending[0]) {
        const pendingValue: number = pending.reduce((acc, cur) => acc + cur.amount, 0);
        setPendentPayments(pendingValue);
      } else {
        setPendentPayments(0);
      }
    });
  }, []);

  return (
    <Container>
      <Text
        style={{ fontFamily: 'WorkSans Medium', fontSize: 26 }}
      >Quanto você quer sacar da sua conta?</Text>
      <PriceInput
        value={currencyFormat(price, true)}
        keyboardType="number-pad"
        onChangeText={(value: string) => {
          const max = current.account - pendentPayments;
          let unformatted = parseFloat(currencyFormat(value, true).substring(3).replace('.', '').replace(',', '.'));
          unformatted = unformatted > max ? max : unformatted;
          setPrice(unformatted);

          if (!firstType) setFirstType(true);
        }}
      />
      <Text
        style={{ color: firstType && error ? 'red' : 'black' }}
      >
        {
          firstType && error
            ? 'Insira um valor válido'
            : `Saldo disponível: ${currencyFormat(current.account - pendentPayments, true)}`
        }
      </Text>

      <Button
        disabled={error}
        style={{ marginTop: 30 }}
        onPress={() => moveToIndex(1)}
      >Confirmar</Button>

      {
        pendentPayments
          ? <Text style={{ marginTop: 20 }}>{ `${currencyFormat(pendentPayments, true)} em saques pendentes` }</Text>
          : <></>
      }
    </Container>
  );
};

export default PriceSelector;
