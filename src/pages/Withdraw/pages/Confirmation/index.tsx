import React, { useContext } from 'react';
import { Container, Text } from './styles';
import Button from '../../../../components/Button';
import { ChildProps } from '../../../../components/Switcher';
import { Alert, View } from 'react-native';

import AuthContext from '../../../../context/auth';
import { WithDrawContext } from '../../index';
import { currencyFormat } from '../../../../utils';
import { useFetch } from '../../../../hooks';
import { useNavigation } from '@react-navigation/native';

const Confirmation: React.FC<ChildProps> = ({ moveToIndex }) => {
  const { current } = useContext(AuthContext);
  const { price } = useContext(WithDrawContext);

  const navigation = useNavigation();

  if (!moveToIndex || !current) return <></>;

  const requestWithdraw = async () => {
    const { secret, token } = current;

    console.log(`token: ${token}`);
    console.log(`secret: ${secret}`);

    useFetch.post(`/u/w/${token}/${secret}`, { amount: price }, (response) => {
      if (response.code === 'error') {
        return Alert.alert('Erro', 'Não foi possível enviar o pedido.', [{ text: 'Ok' }]);
      }

      Alert.alert('Sucesso', 'Pedido enviado!', [{ text: 'Ok', onPress: () => navigation.navigate('Página Inicial') }]);
    });
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontSize: 20, marginBottom: 15 }}
        >Confirmação</Text>
        <Text>Um pedido de saque será enviado, o valor de { currencyFormat(price, true) } será enviado através do método de saque selecionado.</Text>

      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: -5 }}>
        <Button style={{ marginHorizontal: 5, flex: 1 }} onPress={() => moveToIndex(0)}>Voltar</Button>
        <Button style={{ marginHorizontal: 5, flex: 1 }} onPress={requestWithdraw}>Confirmar</Button>
      </View>
    </Container>
  );
};

export default Confirmation;
