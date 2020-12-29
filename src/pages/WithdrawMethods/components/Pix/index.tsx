import React from 'react';
import { View } from 'react-native';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextField';
import { Label } from '../../styles';

const Pix: React.FC = () => {
  return (
    <View>
      <Label style={{ marginTop: 10, marginBottom: 3 }}>Chave Pix</Label>
      <TextInput placeholder="Chave Pix" />
      <Button style={{ marginTop: 30 }}>Salvar alterações</Button>
    </View>
  );
};

export default Pix;
