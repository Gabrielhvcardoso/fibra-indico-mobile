import React, { createRef, useContext, useState } from 'react';
import { ActivityIndicator, Alert, TextInput as TextInputType, View } from 'react-native';
import { Container, Label } from './styles';
import Picker, { PickerItem } from '../../components/Picker';
import TextInput from '../../components/TextField';
import Button from '../../components/Button';
import { theme } from '../../theme';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';

import AuthContext from '../../context/auth';
import DataContext from '../../context/data';

import { useFetch } from '../../hooks';
import { phoneFormatter } from '../../utils';

interface FormProps {
  product: number | string,
  client: string,
  phone1: string,
  phone2: string
}

type RouterProps = StackScreenProps<RootStackParamList, 'indicate'>

const Indicate: React.FC<RouterProps> = ({ navigation }) => {
  const { current } = useContext(AuthContext);
  const { products } = useContext(DataContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormProps>({} as FormProps);
  const inputs = {
    input1: createRef<TextInputType>(),
    input2: createRef<TextInputType>(),
    input3: createRef<TextInputType>()
  };

  const handleIndicate = () => {
    if (!form.product || !form.client || !form.phone1) {
      return Alert.alert('Atenção', 'Complete todos os campos', [{ text: 'Ok' }]);
    }

    setIsLoading(true);

    useFetch.post('/u/i', {
      recommendation: {
        fromUserToken: current?.token,
        productId: form.product,
        client: form.client,
        phone1: form.phone1,
        phone2: form.phone2
      }
    }, (response) => {
      setIsLoading(false);
      if (response.code === 'error') {
        return Alert.alert('Erro', 'Ocorreu um erro ao tentar indicar.', [{ text: 'Ok' }]);
      }

      navigation.goBack();
      Alert.alert('Sucesso', 'Indicação enviada.', [{ text: 'Ok' }]);
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Container>
      <Label style={{ marginBottom: 5 }}>Selecione o produto</Label>
      <Picker value={form.product ?? 0} onValueChange={(value) => setForm({ ...form, product: value })}>
        { products.map(({ productId, title }) => <PickerItem key={productId} value={productId} label={title} />) }
      </Picker>

      {
        form.product && form.product !== 0 && (
          <Label style={{ fontSize: 12, textAlign: 'right', color: theme.b0.hex() }}>
            { 'Comissão pelo produto: R$ ' + products.find(({ productId }) => form.product === productId)?.commission.toFixed(2).replace('.', ',') }
          </Label>
        )
      }

      <Label style={{ marginTop: 20 }}>Nome do cliente</Label>
      <TextInput
        ref={inputs.input1}
        onSubmitEditing={() => inputs.input2.current?.focus()}
        value={form.client}
        onChangeText={(value: string) => setForm({ ...form, client: value })}
        returnKeyType="next"
        placeholder="Nome do cliente"
      />

      <Label style={{ marginTop: 20 }}>Telefone principal (obrigatório)</Label>
      <TextInput
        ref={inputs.input2}
        onSubmitEditing={() => inputs.input3.current?.focus()}
        value={form.phone1}
        onChangeText={(value: string) => setForm({ ...form, phone1: phoneFormatter(value) })}
        keyboardType="number-pad"
        placeholder="(00) 0000-0000"
      />

      <Label style={{ marginTop: 20 }}>Outro telefone (opcional)</Label>
      <TextInput
        ref={inputs.input3}
        value={form.phone2}
        onChangeText={(value: string) => setForm({ ...form, phone2: phoneFormatter(value) })}
        keyboardType="number-pad"
        placeholder="(00) 0000-0000"
      />

      <Button onPress={handleIndicate} style={{ marginTop: 20 }}>
        Indicar cliente
      </Button>
    </Container>
  );
};

export default Indicate;
