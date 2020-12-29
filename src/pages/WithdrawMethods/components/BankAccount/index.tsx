import React, { useContext, useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import Picker, { PickerItem } from '../../../../components/Picker';
import TextInput from '../../../../components/TextField';
import { View } from 'react-native';
import { Label } from './styles';

import { LocalContext } from '../../index';
import bankCodes from './bankCodes.json';

const BankAccount: React.FC = () => {
  const { account: localAccount, onSave } = useContext(LocalContext);

  const [account, setAccount] = useState<any>(localAccount);

  useEffect(() => setAccount(localAccount), [localAccount]);

  return (
    <View>
      <Label>Nome do Titular da Conta</Label>
      <TextInput value={account?.name} onChangeText={(value: string) => setAccount({ ...account, name: value })} placeholder="Nome do Titular da Conta" />

      <Label>Banco</Label>
      <Picker value={account?.bank} onValueChange={(value) => setAccount({ ...account, bank: value })}>
        <PickerItem value={0} label="Selecione" />
        {
          bankCodes.sort((a, b) => a.label > b.label ? 1 : -1).map((item) => (
            <PickerItem key={item.value} value={item.value} label={item.label + ' - ' + item.value} />
          ))
        }
      </Picker>

      <Label>CPF ou CNPJ</Label>
      <TextInput value={account?.cpf} onChangeText={(value: string) => setAccount({ ...account, cpf: value })} placeholder="CPF ou CNPJ" />

      <Label>Agência</Label>
      <TextInput value={account?.agency} onChangeText={(value: string) => setAccount({ ...account, agency: value })} placeholder="Agência" />

      <Label>Conta</Label>
      <TextInput value={account?.account} onChangeText={(value: string) => setAccount({ ...account, account: value })} placeholder="Conta" />

      <Button onPress={() => onSave(account)} style={{ marginTop: 30 }}>Salvar alterações</Button>
    </View>
  );
};

export default BankAccount;
