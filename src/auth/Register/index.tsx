import React, { useEffect, useState } from 'react';
import { Container, Label } from './styles';
import TextInput from '../../components/TextField';
import Picker, { PickerItem } from '../../components/Picker';
import Button from '../../components/Button';
import { Alert, TouchableOpacity } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { NotLoggedStackParamList } from '../../routes';
import { useFetch } from '../../hooks';
import { cpfFormatter, phoneFormatter } from '../../utils';

interface StateObject {
  id: number,
  sigla: string,
  nome: string,
  regiao: any
}

interface CityObject {
  id: number,
  nome: string,
  microrregiao: any
}

interface RegisterForm {
  name: string,
  email: string,
  password: string,
  phone: string,
  cpf: string,
  state: string,
  city: string,
  indicatedBy: string
}

type Props = StackScreenProps<NotLoggedStackParamList, 'register'>;

const Register: React.FC<Props> = ({ navigation }) => {
  const [register, setRegister] = useState<RegisterForm>({} as RegisterForm);
  const [states, setStates] = useState<Array<StateObject>>([]);
  const [cities, setCities] = useState<Array<CityObject>>([]);

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json().then(data => setStates(data)));
  }, []);

  useEffect(() => {
    if (register.state) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${register.state}/municipios`)
        .then((response) => response.json().then((data) => setCities(data)));
    }
  }, [register.state]);

  const onRegister = () => {
    if (!register.email || !register.password || !register.name || !register.phone || !register.cpf || !register.state || !register.city) {
      return Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.', [{ text: 'Ok' }]);
    }

    if (!register.email.includes('@')) {
      return Alert.alert('Atenção', 'E-mail inválido.', [{ text: 'Ok' }]);
    }

    if (register.password.length < 8 || register.password.length > 20) {
      return Alert.alert('Atenção', 'Sua senha deve ter entre 8 e 20 caracteres.', [{ text: 'Ok' }]);
    }

    useFetch.put('/u', { user: register }, (response) => {
      if (response.code === 'error') {
        Alert.alert(
          'Erro',
          response.message ? 'O código de indicação é inválido' : 'Não foi possível criar sua conta, verifique se todos os campos estão corretos e certifique-se se seu CPF já não está cadastrado no sistema.',
          [{ text: 'Ok' }]
        );
      } else {
        Alert.alert(
          'Sucesso',
          'Sua conta foi criada, aguarde pela confirmação da sua conta que será notificada via e-mail ou por ligação.',
          [{ text: 'Ok' }]
        );
      }
    });
  };

  return (
    <Container>
      <Label>Nome completo</Label>
      <TextInput
        value={register.name}
        onChangeText={(value: string) => setRegister({ ...register, name: value })}
        placeholder="Nome completo"
      />

      <Label>E-mail</Label>
      <TextInput
        value={register.email}
        onChangeText={(value: string) => setRegister({ ...register, email: value })}
        placeholder="E-mail"
      />

      <Label>Senha</Label>
      <TextInput
        value={register.password}
        onChangeText={(value: string) => setRegister({ ...register, password: value })}
        secureTextEntry
        placeholder="Senha (8 a 20 caracteres)"
      />

      <Label>Telefone</Label>
      <TextInput
        keyboardType="number-pad"
        value={register.phone}
        onChangeText={(value: string) => setRegister({ ...register, phone: phoneFormatter(value) })}
        placeholder="Telefone"
      />

      <Label>CPF</Label>
      <TextInput
        value={register.cpf}
        onChangeText={(value: string) => setRegister({ ...register, cpf: cpfFormatter(value) })}
        placeholder="CPF"
      />

      <Label>Estado</Label>
      <Picker
        value={register.state ?? ''}
        onValueChange={(value) => setRegister({ ...register, state: value.toString(), city: '' })}
      >
        <PickerItem value="" label="Selecione" />
        {
          states.sort((a, b) => a.nome > b.nome ? 1 : -1).map(item => (
            <PickerItem key={item.id} value={item.sigla} label={item.nome} />
          ))
        }
      </Picker>

      <Label>Cidade</Label>
      <Picker
        value={register.city ?? ''}
        onValueChange={(value) => setRegister({ ...register, city: value.toString() })}
      >
        <PickerItem value="" label={(!register.state || register.state === '') ? 'Selecione um estado' : cities[0] ? 'Selecione' : 'Carregando...' } />
        {
          register.state !== '' && cities.map(item => (
            <PickerItem key={item.id} value={item.nome} label={item.nome} />
          ))
        }
      </Picker>

      <Label style={{ marginBottom: 0 }}>Código de indicação</Label>
      <Label style={{ marginTop: 0, color: 'grey' }}>Código de quem te indicou o aplicativo (opcional)</Label>
      <TextInput
        value={register.indicatedBy}
        onChangeText={(value: string) => setRegister({ ...register, indicatedBy: value })}
        placeholder="XXXXXXXXXXX"
      />

      <TouchableOpacity onPress={() => navigation.navigate('terms')} style={{ marginTop: 20 }}>
        <Label>Ao cadastrar-se você concorda com os termos de uso.</Label>
      </TouchableOpacity>
      <Button
        onPress={onRegister}
        style={{ marginTop: 30 }}
      >Registrar-se</Button>
    </Container>
  );
};

export default Register;
