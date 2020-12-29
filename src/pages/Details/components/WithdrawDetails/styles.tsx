import { format } from 'date-fns';
import React, { useContext } from 'react';
import styled from 'styled-components/native';
import AuthContext from '../../../../context/auth';
import { Withdraw } from '../../../../types/Withdraw';
import { currencyFormat } from '../../../../utils';

export const Container = styled.View`
  flex: 1;
  background-color: white;
  padding: 15px;
`;

const BadgeItem = styled.View`
  align-items: center;
  border-radius: 20px;
  flex-direction: row;
  padding: 5px 5px;
`;

const BadgeText = styled.Text`
  color: white;
  font-family: 'WorkSans';
  margin: 0px 5px 0px 10px;
  text-align: center;
`;

interface BadgeProps {
  color?: string,
  icon?: () => React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ color, icon, children }) => (
  <BadgeItem style={{ backgroundColor: color ?? 'orange' }}>
    { icon ? icon() : null }
    <BadgeText>
      { children }
    </BadgeText>
  </BadgeItem>
);

export const Text = styled.Text`
  font-family: 'WorkSans'
`;

const TicketContainer = styled.View`
  background-color: #ffedb3;
  padding: 20px;
`;

const EdgeDetail = styled.View<{ position: 'a' | 'b' | 'c' | 'd'}>`
  background-color: white;
  border-radius: 10px;
  height: 20px;
  position: absolute;
  ${
    props => props.position === 'a'
      ? 'left: -10px; top: -10px;'
      : props.position === 'b'
        ? 'right: -10px; top: -10px;'
        : props.position === 'c'
          ? 'right: -10px; bottom: -10px;'
          : 'left: -10px; bottom: -10px;'
  }
  width: 20px;
`;

const Break = () => <Text></Text>;

export const Ticket: React.FC<{ item: Withdraw }> = ({ item }) => {
  const { current } = useContext(AuthContext);

  return (
    <>
      <TicketContainer>
        <Text>PEDIDO DE SAQUE</Text>
        <Break />
        <Text>Saque de { currencyFormat(item.amount, true) }</Text>
        <Text>Status: { item.status }</Text>
      </TicketContainer>
      <TicketContainer>
        <EdgeDetail position="a" />
        <EdgeDetail position="b" />
        <Text>Criado em { format(parseInt(item.createdAt), "dd/MM/yyyy 'às' kk:mm") }</Text>
        <Text>Por { current?.name }</Text>
      </TicketContainer>
    </>
  );
};
