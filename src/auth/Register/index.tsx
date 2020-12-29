import React, { useEffect, useState } from 'react';
import { Container, Label } from './styles';
import TextInput from '../../components/TextField';
import Picker, { PickerItem } from '../../components/Picker';
import Button from '../../components/Button';
import { TouchableOpacity } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { NotLoggedStackParamList } from '../../routes';

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
  }, []);

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

      <Label>Telefone</Label>
      <TextInput
        value={register.phone}
        onChangeText={(value: string) => setRegister({ ...register, phone: value })}
        placeholder="Telefone"
      />

      <Label>CPF</Label>
      <TextInput
        value={register.cpf}
        onChangeText={(value: string) => setRegister({ ...register, cpf: value })}
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
        style={{ marginTop: 30 }}
      >Registrar-se</Button>
    </Container>
  );
};

export default Register;
