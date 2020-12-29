import React, { useContext, useState } from 'react';
import { Keyboard, TouchableOpacity, View, Modal, ActivityIndicator, Text } from 'react-native';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { Container, Label } from './styles';
import { StackScreenProps } from '@react-navigation/stack';
import { NotLoggedStackParamList } from '../../routes';

import AuthContext from '../../context/auth';

import { useFetch } from '../../hooks';

type Props = StackScreenProps<NotLoggedStackParamList, 'login'>;

const Login: React.FC<Props> = ({ navigation }) => {
  const { authenticate } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    setIsLoading(true);
    useFetch.post('/u', {
      login: email,
      password
    }, (response) => {
      console.log(response);

      if (response.code === 'error') {
        setIsLoading(false);
        return setIsError(true);
      }

      const { user } = response;
      authenticate(user);
    });
  };

  return (
    <Container onStartShouldSetResponder={() => Keyboard.dismiss()}>
      <View style={{ height: 84 }}/>

      <Modal transparent visible={isError} onRequestClose={() => setIsError(false)}>
        <TouchableOpacity activeOpacity={1} onPress={() => setIsError(false)} style={{ flex: 1, backgroundColor: '#00000066', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', width: '80%', padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Credenciais inválidas</Text>
            <Text>Não foi possível entrar com essas credenciais.</Text>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal transparent visible={isLoading}>
        <View style={{ flex: 1, backgroundColor: '#00000066', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color="white" size="large" />
        </View>
      </Modal>

      <View>
        <Label>Entre na sua conta</Label>
        <TextField
          onChangeText={(e: string) => setEmail(e)}
          placeholder="E-mail"
          value={email}
        />
        <TextField
          onChangeText={(e: string) => setPassword(e)}
          placeholder="Senha"
          style={{ marginTop: 15 }}
          value={password}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('register')}
          style={{ marginVertical: 20 }}
        >
          <Label>Ainda não tem uma conta? Registre-se</Label>
        </TouchableOpacity>
        <Button
          disabled={email === '' || password === '' || !email.includes('@')}
          onPress={handleLogin}
        >Entrar</Button>
      </View>
    </Container>
  );
};

export default Login;
