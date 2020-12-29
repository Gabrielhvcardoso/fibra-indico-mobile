import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Container, Ticket } from './styles';
import { Withdraw } from '../../../../types/Withdraw';

interface Props {
  item: Withdraw
}

const WithdrawDetails: React.FC<Props> = ({ item }) => {
  return (
    <Container>
      <Ticket item={item} />
      <StatusBar style="dark" />
    </Container>
  );
};

export default WithdrawDetails;
