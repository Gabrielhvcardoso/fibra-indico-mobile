import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes';

import { isWithdraw } from '../../types/Withdraw';

import RecommendationDetails from './components/RecommendationDetails';
import WithdrawDetails from './components/WithdrawDetails';

type Props = StackScreenProps<RootStackParamList, 'details'>;

const Details: React.FC<Props> = ({ route }) => {
  const { item } = route.params;

  return isWithdraw(item)
    ? <WithdrawDetails item={item} />
    : <RecommendationDetails item={item} />;
};

export default Details;
