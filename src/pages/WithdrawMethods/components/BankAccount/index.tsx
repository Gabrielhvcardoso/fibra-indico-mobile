import React, { useState } from 'react';
import Button from '../../../../components/Button';
import Picker, { PickerItem } from '../../../../components/Picker';
import TextInput from '../../../../components/TextField';
import { View } from 'react-native';
import { Label } from './styles';

import bankCodes from './bankCodes.json';

const BankAccount: React.FC = () => {
  const [bank, setBank] = useState<number | string>(0);

  return (
    <View>
      <Label>Nome do Titular da Conta</Label>
      <TextInput placeholder="Nome do Titular da Conta" />

      <Label>Banco</Label>
      <Picker value={bank} onValueChange={(value) => setBank(value)}>
        <PickerItem value={0} label="Selecione" />
        {
          bankCodes.sort((a, b) => a.label > b.label ? 1 : -1).map((item) => (
            <PickerItem key={item.value} value={item.value} label={item.label + ' - ' + item.value} />
          ))
        }
      </Picker>

      <Label>CPF ou CNPJ</Label>
      <TextInput placeholder="CPF ou CNPJ" />

      <Label>Agência</Label>
      <TextInput placeholder="Agência" />

      <Label>Conta</Label>
      <TextInput placeholder="Conta" />

      <Button style={{ marginTop: 30 }}>Salvar alterações</Button>
    </View>
  );
};

export default BankAccount;
