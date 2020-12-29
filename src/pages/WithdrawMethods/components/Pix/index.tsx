import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { LocalContext } from '../../index';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextField';
import { Label } from '../../styles';

const Pix: React.FC = () => {
  const { account: localAccount, onSave } = useContext(LocalContext);

  const [account, setAccount] = useState<any>(localAccount);

  useEffect(() => setAccount(localAccount), [localAccount]);

  return (
    <View>
      <Label style={{ marginTop: 10, marginBottom: 3 }}>Chave Pix</Label>
      <TextInput value={account?.pix} onChangeText={(value: string) => setAccount({ ...account, pix: value })} placeholder="Chave Pix" />
      <Button onPress={() => onSave(account)} style={{ marginTop: 30 }}>Salvar alterações</Button>
    </View>
  );
};

export default Pix;
