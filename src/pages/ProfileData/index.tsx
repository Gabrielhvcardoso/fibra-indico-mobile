import React, { useContext, useState } from 'react';
import { Container, Label } from './styles';
import Button from '../../components/Button';
import TextInput from '../../components/TextField';

import { cpfFormatter, phoneFormatter } from '../../utils';
import AuthContext from '../../context/auth';
import { User } from '../../types/User';
import { useFetch } from '../../hooks';
import { Alert, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileData: React.FC = () => {
  const { current, authenticate } = useContext(AuthContext);
  const [user, setUser] = useState<User>(current ?? {} as User);

  const navigation = useNavigation();

  const saveUser = () => {
    if (current) {
      const { secret, token } = current;
      useFetch.post(`/u/${token}/${secret}`, { user }, (response) => {
        if (response.code === 'error') {
          return Alert.alert('Erro', 'Não foi possível salvar as alterações', [{ text: 'Ok' }]);
        }

        authenticate(user);
        ToastAndroid.showWithGravity('As alterações foram salvas.', ToastAndroid.LONG, ToastAndroid.CENTER);
        navigation.goBack();
      });
    } else {
      Alert.alert('Erro', 'Erro inesperado', [{ text: 'Ok' }]);
    }
  };

  return (
    <Container>
      <Label>Nome completo</Label>
      <TextInput
        value={user.name}
        onChangeText={(value: string) => setUser({ ...user, name: value })}
        placeholder="Nome completo"
      />

      <Label>CPF</Label>
      <TextInput
        keyboardType="number-pad"
        value={user.cpf}
        onChangeText={(value: string) => setUser({ ...user, cpf: cpfFormatter(value) })}
        placeholder="CPF"
      />

      <Label>Telefone</Label>
      <TextInput
        keyboardType="number-pad"
        value={user.phone}
        onChangeText={(value: string) => setUser({ ...user, phone: phoneFormatter(value) })}
        placeholder="Telefone"
      />

      <Label>E-mail</Label>
      <TextInput
        keyboardType="email-address"
        value={user.email}
        onChangeText={(value: string) => setUser({ ...user, email: value })}
        placeholder="E-mail"
      />

      <Button onPress={saveUser} style={{ marginTop: 30 }}>
        Salvar alterações
      </Button>
    </Container>
  );
};

export default ProfileData;
