import React from 'react';
import { View } from 'react-native';
import TextInput from '../../../../components/TextField';
import Button from '../../../../components/Button';
import { Label } from '../../styles';

const PicPay: React.FC = () => {
  return (
    <View>
      <Label style={{ marginTop: 10, marginBottom: 3 }}>Usuário PicPay</Label>
      <TextInput
        placeholder="Usuário PicPay"
      />
      <Button style={{ marginTop: 30 }}>Salvar alterações</Button>
    </View>
  );
};

export default PicPay;
