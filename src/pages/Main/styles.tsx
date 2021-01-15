import React from 'react';
import styled from 'styled-components/native';
import { StatusBar, TouchableOpacityProps } from 'react-native';
import { format } from 'date-fns';
import { theme } from '../../theme';

import { RecommendationProduct } from './index';
import { Withdraw, isWithdraw } from '../../types/Withdraw';
import { ptBR } from 'date-fns/locale';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';

export const Surface = styled.View`
  padding: ${StatusBar.currentHeight}px 15px 0px 15px;
  background-color: ${theme.w2.hex()};
  border-radius: 15px;
`;

export const CurrencyView = styled.View`
  align-items: center;
  height: 180px;
  justify-content: center;
`;

export const Currency = styled.Text`
  font-family: 'WorkSans Medium';
  font-size: 40px;
`;

export const Label = styled.Text`
  color: ${theme.g3.hex()};
  font-family: 'WorkSans';
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  background-color: ${theme.w1.hex()};
  border-radius: 4px;
  flex: 1;
  flex-direction: row;
  margin: 0px 5px;
  padding: 10px 15px;
`;

export const ButtonText = styled.Text`
  color: ${theme.b1.hex()};
  font-family: 'WorkSans';
  flex: 1;
  margin-left: 15px;
  text-align: center;
  text-transform: uppercase;
`;

interface NavItemProps extends TouchableOpacityProps {
  selected?: boolean
}

export const NavItem = styled.TouchableOpacity<NavItemProps>`
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.selected ? 'blue' : 'white'};
  flex: 1;
  font-family: 'WorkSans Medium';
  padding: 20px 0px;
  text-align: center;
`;

export const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 18px 5px;
  margin: 0px 15px;
  /* border-bottom-width: 0.3px; */
  /* border-bottom-color: ${theme.w3.hex()}; */
`;

export const View = styled.View``;

export const ListItemTitle = styled.Text.attrs({
  numberOfLines: 1
})`
  font-family: 'WorkSans';
  font-size: 17px;
  line-height: 19px;
  padding-right: 15px;
`;

export const ListItemSubTitle = styled.Text`
  color: ${theme.g5.hex()};
  font-family: 'WorkSans';
  font-size: 14px;
  line-height: 16px;
`;

interface RecommendationProps {
  item: RecommendationProduct | Withdraw
}

const resolveStatus = (status: string, withdraw = false) => {
  switch (status) {
    case 'failed': return 'Falha';
    case 'recused': return 'Recusado';
    case 'cancelled': return 'Cancelado';
    case 'no-response': return 'Sem resposta';
    case 'pending': return 'Pendente';
    case 'pendent': return 'Pendente';
    case 'done': return withdraw ? 'Finalizado' : 'Instalado';
    default: return 'Indefinido';
  }
};

export const Recommendation: React.FC<RecommendationProps> = ({ item }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Página Inicial'>>();

  return (
    <ListItem onPress={() => navigation.navigate('details', { item })}>
      <View style={{ flex: 1 }}>
        {
          isWithdraw(item)
            ? (
                <>
                  <ListItemTitle>Saque de R$ { item.amount.toFixed(2).replace('.', ',') }</ListItemTitle>
                  <ListItemSubTitle>{ format(parseInt(item.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) }</ListItemSubTitle>
                </>
              )
            : (
                <>
                  <ListItemTitle>{ item.title }</ListItemTitle>
                  <ListItemSubTitle>R$ { item.commission.toFixed(2).replace('.', ',') }</ListItemSubTitle>
                </>
              )
        }
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <ListItemSubTitle>
          {
            isWithdraw(item)
              ? resolveStatus(item.status, true)
              : format(parseInt(item.createdAt), "dd/MM/yyyy 'às' kk:mm", { locale: ptBR })
          }
        </ListItemSubTitle>
        <ListItemSubTitle>
          { !isWithdraw(item) && resolveStatus(item.status) }
        </ListItemSubTitle>
      </View>
    </ListItem>
  );
};
