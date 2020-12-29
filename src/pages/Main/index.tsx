import React, { useContext, useEffect, useState } from 'react';
import { Button, ButtonText, Currency, CurrencyView, Label, Recommendation, Surface } from './styles';
import { Dimensions, FlatList, View } from 'react-native';
import CashStack from 'react-native-bootstrap-icons/icons/cash-stack';
import Envelope from 'react-native-bootstrap-icons/icons/envelope';
import { theme } from '../../theme';

import { createMaterialTopTabNavigator, MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import AuthContext from '../../context/auth';

import { RootStackParamList } from '../../routes';
import { Recommendation as RecommendationType } from '../../types/Recommendation';
import { Withdraw, isWithdraw } from '../../types/Withdraw';
import { StatusBar } from 'expo-status-bar';
import { useFetch } from '../../hooks';
import { currencyFormat } from '../../utils';

export interface RecommendationProduct extends RecommendationType {
  title: string,
  commission: number,
  STATUS: number
}

type HistoryItem = Array<RecommendationProduct | Withdraw>;
type Props = StackScreenProps<RootStackParamList, 'Página Inicial'>;

export type TopTabParamList = {
  recommendations: {
    refresh: (endding?: (response: HistoryItem | undefined) => void) => void,
    items: HistoryItem
  },
  withdraws: {
    refresh: (endding?: (response: HistoryItem | undefined) => void) => void,
    items: HistoryItem
  }
}

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

const List: React.FC<MaterialTopTabScreenProps<TopTabParamList, 'withdraws' | 'recommendations'>> = ({ route }) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { items: initialItems, refresh } = route.params;

  const [items, setItems] = useState<HistoryItem>(initialItems);

  const onRefresh = () => {
    setIsRefreshing(true);
    refresh((newItems: HistoryItem | undefined) => {
      if (newItems) {
        if (route.name === 'withdraws') {
          setItems(newItems.filter(item => isWithdraw(item)));
        } else {
          setItems(newItems.filter(item => !isWithdraw(item)));
        }
      } else setItems([]);
      setIsRefreshing(false);
    });
  };

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      removeClippedSubviews
      style={{ width: Dimensions.get('window').width, backgroundColor: 'white', flex: 1 }}
      data={items}
      keyExtractor={item => isWithdraw(item) ? 'w' + item.withdrawOrderId : 'r' + item.recommendationId}
      renderItem={({ item }) => <Recommendation item={item} />}
    />
  );
};

const Main: React.FC<Props> = ({ navigation, route }) => {
  const { current } = useContext(AuthContext);
  const [history, setHistory] = useState<HistoryItem>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const findHistory = (endding = (response?: HistoryItem) => {}) => {
    if (current) {
      const { secret, token } = current;
      type Response = { code: 'error' } | { code: 'success', history: HistoryItem };

      useFetch.get(`/u/${token}/${secret}`, (response: Response) => {
        if (response.code === 'error') {
          return null;
        }

        const { history: responseHistory } = response;
        setHistory(responseHistory.reverse());
        endding(responseHistory);
      });
    }
  };

  useEffect(() => {
    findHistory(() => setIsLoading(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent style="dark" />
      <Surface onPress={() => console.log(history)}>
        <CurrencyView>
          <Label>Sua conta</Label>
          <Currency>{ current && currencyFormat(current.account, true) }</Currency>
        </CurrencyView>
      </Surface>

      <View style={{ flexDirection: 'row', marginVertical: 15, marginHorizontal: 10 }}>
        <Button onPress={() => navigation.navigate('indicate')}>
          <Envelope width={25} height={25} fill={theme.b0.hex()} />
          <ButtonText>Indicar</ButtonText>
        </Button>

        <Button onPress={() => navigation.navigate('withdraw')}>
          <CashStack width={25} height={25} fill={theme.b0.hex()} />
          <ButtonText>Sacar</ButtonText>
        </Button>
      </View>
      {
        !isLoading && (
          <TopTab.Navigator
            style={{ flex: 1 }}
            tabBarOptions={{
              style: { backgroundColor: '#f2f2f2' }
            }}
          >
            <TopTab.Screen
              name="recommendations"
              component={List}
              initialParams={{ refresh: findHistory, items: history.filter(item => !isWithdraw(item)) }}
              options={{ title: 'Indicações' }}
            />
            <TopTab.Screen
              name="withdraws"
              component={List}
              initialParams={{ refresh: findHistory, items: history.filter(item => isWithdraw(item)) }}
              options={{ title: 'Pedidos de saque' }}
            />
          </TopTab.Navigator>
        )
      }
    </View>
  );
};

export default Main;
