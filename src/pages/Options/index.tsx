import React, { useContext } from 'react';
import { Container, MenuItem, ProfileContainer, Text } from './styles';
import { theme } from '../../theme';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';

import Book from 'react-native-bootstrap-icons/icons/book';
import DoorOpen from 'react-native-bootstrap-icons/icons/door-open';
import CreditCard from 'react-native-bootstrap-icons/icons/credit-card';
import Trash from 'react-native-bootstrap-icons/icons/trash';

import AuthContext from '../../context/auth';

const iconProps = {
  width: 25,
  height: 25,
  fill: theme.b0.hex()
};

type Props = StackScreenProps<RootStackParamList, 'options'>;

const Options: React.FC<Props> = ({ navigation }) => {
  const { authenticate, current } = useContext(AuthContext);

  if (!current) return <></>;

  return (
    <Container>
      <ProfileContainer onPress={() => navigation.navigate('profile')} >
        <Text numberOfLines={1} style={{ fontSize: 20, fontFamily: 'WorkSans SemiBold' }}>{ current.name }</Text>
        <Text>Meus dados</Text>
      </ProfileContainer>
      <MenuItem onPress={() => navigation.navigate('methods')} icon={(props) => <CreditCard {...iconProps} {...props} />}>Formas de saque</MenuItem>
      <MenuItem onPress={() => navigation.navigate('terms')} icon={(props) => <Book {...iconProps} {...props} />}>Termos de uso</MenuItem>
      <MenuItem onPress={() => authenticate(null)} icon={(props) => <DoorOpen {...iconProps} {...props} />}>Sair</MenuItem>
      <MenuItem icon={(props) => <Trash {...iconProps} {...props} />}>Apagar conta</MenuItem>
    </Container>
  );
};

export default Options;
