import React, { createContext, useContext, useEffect, useState } from 'react';
import { Container } from './styles';
import RadioGroup, { RadioItem } from '../../components/RadioGroup';

import BankAccount from './components/BankAccount';
import PicPay from './components/PicPay';
import Pix from './components/Pix';

import AuthContext from '../../context/auth';
import { Account } from '../../types/Account';
import { useFetch } from '../../hooks';
import { Alert } from 'react-native';

interface LocalContextProps {
  account: Account | null,
  onSave: (newAccount: any) => void
}

export const LocalContext = createContext<LocalContextProps>({} as LocalContextProps);

const WithdrawMethods: React.FC = () => {
  const { current } = useContext(AuthContext);
  const [method, setMethodValue] = useState<number | string>(1);
  const [account, setAccount] = useState<Account | null>(null);

  const setMethod = (value: number | string) => {
    setAccount(null);
    setMethodValue(value);
  };

  useEffect(() => {
    if (current) {
      const { secret, token } = current;
      useFetch.get(`/u/a/${token}/${secret}`, (response) => {
        if (response) {
          // Receive account when it's already defined
          const newAccount = JSON.parse(response.accountJson);

          console.log(newAccount);
          setMethod(newAccount.type);
          setAccount(newAccount);
        }
      });
    }
  }, [current]);

  useEffect(() => {
    if (current) {
      const { secret, token } = current;
      useFetch.get(`/u/a/${token}/${secret}`, (response) => {
        if (response) {
          // Receive account when it's already defined
          const newAccount = account
            ? JSON.parse({ ...response.accountJson, accountId: account.accountId })
            : JSON.parse(response.accountJson);

          console.log(newAccount);
          if (method === newAccount.type) {
            setAccount(newAccount);
          }
        }
      });
    }
  }, [method]);

  const onSave = (newAccount: any): void => {
    if (current) {
      const { secret, token } = current;

      const accountJson = JSON.stringify({ ...newAccount, type: method });

      useFetch.post(`/u/a/${token}/${secret}`, {
        account: {
          accountId: 0,
          token,
          accountJson
        }
      }, (response) => {
        if (response.code === 'success') {
          Alert.alert('Sucesso', 'Conta atualizada!', [{ text: 'Ok' }]);
        }
      });
    }
  };

  return (
    <Container>
      <RadioGroup value={method} onValueChange={(value) => setMethod(value)} >
        <RadioItem value={1}>Conta bancária (DOC e TED)</RadioItem>
        <RadioItem value={2}>PicPay</RadioItem>
        <RadioItem value={3}>Pix</RadioItem>
      </RadioGroup>

      <LocalContext.Provider value={{ account, onSave }}>
        {
          method === 1
            ? <BankAccount />
            : method === 2
              ? <PicPay />
              : <Pix />
        }
      </LocalContext.Provider>
    </Container>
  );
};

export default WithdrawMethods;
