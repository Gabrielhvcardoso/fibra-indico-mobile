import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import TextInput from '../../../../components/TextField';
import Button from '../../../../components/Button';
import { Label } from '../../styles';
import { LocalContext } from '../..';

const PicPay: React.FC = () => {
  const { account: localAccount, onSave } = useContext(LocalContext);

  const [account, setAccount] = useState<any>(localAccount);

  useEffect(() => setAccount(localAccount), [localAccount]);

  return (
    <View>
      <Label style={{ marginTop: 10, marginBottom: 3 }}>Usuário PicPay</Label>
      <TextInput
        value={account?.picpay}
        onChangeText={(value: string) => setAccount({ ...account, picpay: value })}
        placeholder="Usuário PicPay"
      />
      <Button onPress={() => onSave(account)} style={{ marginTop: 30 }}>Salvar alterações</Button>
    </View>
  );
};

export default PicPay;
