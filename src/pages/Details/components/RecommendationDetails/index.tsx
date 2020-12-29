import React from 'react';
import { Container, Text } from './styles';

import { RecommendationProduct } from '../../../Main/index';
import { currencyFormat } from '../../../../utils';

interface Props {
  item: RecommendationProduct
}

const RecommendationDetails: React.FC<Props> = ({ item }) => {
  return (
    <Container>
      <Text numberOfLines={1} style={{ fontSize: 23, fontFamily: 'WorkSans SemiBold' }}>
        { item.title }
      </Text>
      <Text>Status: { item.status }</Text>
      <Text>Comissão: { currencyFormat(item.commission, true) } </Text>

      <Text style={{ marginTop: 20, fontSize: 18, fontFamily: 'WorkSans Medium' }}>Informações do Cliente</Text>

      <Text>Nome: { item.client }</Text>
      <Text>Telefone: { item.phone1 }</Text>
      <Text>{ item.phone2 ?? '' }</Text>
    </Container>
  );
};

export default RecommendationDetails;
