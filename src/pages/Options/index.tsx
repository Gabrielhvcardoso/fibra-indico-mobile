import React, { useContext } from 'react';
import { Container, MenuItem, ProfileContainer, Text } from './styles';
import { theme } from '../../theme';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';

// import Book from 'react-native-bootstrap-icons/icons/book';
import DoorOpen from 'react-native-bootstrap-icons/icons/door-open';
import CreditCard from 'react-native-bootstrap-icons/icons/credit-card';
import Trash from 'react-native-bootstrap-icons/icons/trash';

import AuthContext from '../../context/auth';
import { Alert } from 'react-native';
import { useFetch } from '../../hooks';

const iconProps = {
  width: 25,
  height: 25,
  fill: theme.b0.hex()
};

type Props = StackScreenProps<RootStackParamList, 'options'>;

const Options: React.FC<Props> = ({ navigation }) => {
  const { authenticate, current } = useContext(AuthContext);

  if (!current) return <></>;

  const desativateUser = () => {
    // destroy user has been deprecated, use desativateUser() instead
    Alert.alert(
      'Atenção',
      'Sua conta será desativada, essa pode ser uma ação permanente, sem viabilidade de correção.\n\nTem certeza disso?',
      [
        { text: 'Cancelar' },
        {
          text: 'Ok',
          style: 'destructive',
          onPress: () => {
            const { secret, token } = current;

            useFetch.delete(`/u/${token}/${secret}`, (response) => {
              if (response.code === 'error') {
                Alert.alert(
                  'Erro',
                  'Houve algum problema ao tentarmos desativar sua conta, entre em contato conosco para ajuda ou tente novamente mais tarde.',
                  [{ text: 'Ok' }]
                );
              } else {
                authenticate(null);
              }
            });
          }
        }
      ]
    );
  };

  return (
    <Container>
      <ProfileContainer onPress={() => navigation.navigate('profile')} >
        <Text numberOfLines={1} style={{ fontSize: 20, fontFamily: 'WorkSans SemiBold' }}>{ current.name }</Text>
        <Text>Meus dados</Text>
      </ProfileContainer>
      <MenuItem onPress={() => navigation.navigate('methods')} icon={(props) => <CreditCard {...iconProps} {...props} />}>Métodos de saque</MenuItem>
      {/* <MenuItem onPress={() => navigation.navigate('terms')} icon={(props) => <Book {...iconProps} {...props} />}>Termos de uso</MenuItem> */}
      <MenuItem onPress={() => authenticate(null)} icon={(props) => <DoorOpen {...iconProps} {...props} />}>Sair</MenuItem>
      <MenuItem onPress={desativateUser} danger icon={(props) => <Trash {...iconProps} {...props} fill="red" />}>Apagar conta</MenuItem>
    </Container>
  );
};

export default Options;
