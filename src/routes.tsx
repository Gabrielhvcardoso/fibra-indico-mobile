import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { Recommendation } from './types/Recommendation';
import { Withdraw as WithdrawType } from './types/Withdraw';

import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short';
import Sliders from 'react-native-bootstrap-icons/icons/sliders';

// Authentication

import Login from './auth/Login';
import Register from './auth/Register';

// Pages

import Details from './pages/Details';
import Indicate from './pages/Indicate';
import MainPage from './pages/Main';
import Options from './pages/Options';
import ProfileData from './pages/ProfileData';
import UsageTerms from './pages/UsageTerms';
import Withdraw from './pages/Withdraw';
import WithdrawMethods from './pages/WithdrawMethods';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import AuthContext from './context/auth';

export const goBackButton = (): StackNavigationOptions => ({
  headerBackImage: () => <ArrowLeftShort width={25} height={25} fill="black" fillOpacity="#222" />
});

export const stackTitlePredefinitions = (): StackNavigationOptions => ({
  headerTitleAlign: 'center',
  headerTitleStyle: { fontFamily: 'WorkSans' }
});

export type RootStackParamList = {
  'Página Inicial': undefined,
  details: { item : Recommendation | WithdrawType },
  indicate: undefined,
  withdraw: undefined,
  options: undefined,
  profile: undefined,
  terms: undefined,
  methods: undefined
}

export type NotLoggedStackParamList = {
  login: undefined,
  register: undefined,
  terms: undefined
}

const LoggedStack = createStackNavigator<RootStackParamList>();
const NotLoggedStack = createStackNavigator<NotLoggedStackParamList>();

const Main: React.FC = () => {
  const { current } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {
        current
          ? (
              <LoggedStack.Navigator screenOptions={{ headerStyle: { elevation: 0 }, ...goBackButton(), ...stackTitlePredefinitions() }}>
                <LoggedStack.Screen name="Página Inicial" component={MainPage} options={({ navigation }) => ({
                  headerTransparent: true,
                  headerTitle: '',
                  headerRight: () => <Sliders width={20} height={20} fill="black" onPress={() => navigation.navigate('options')} />,
                  headerRightContainerStyle: { marginRight: 20 }
                })} />
                <LoggedStack.Screen name="details" component={Details} options={({ route }) => ({
                  title: 'Detalhes',
                  headerTitle: format(parseInt(route.params.item.createdAt), 'dd MMM yyyy - kk:mm:SS', { locale: ptBR }),
                  headerTitleStyle: { fontFamily: 'WorkSans', fontSize: 14 }
                })} />
                <LoggedStack.Screen name="indicate" component={Indicate} options={{ title: 'Indicar cliente' }} />
                <LoggedStack.Screen name="withdraw" component={Withdraw} options={{ title: 'Sacar' }} />
                <LoggedStack.Screen name="options" component={Options} options={{ title: 'Ajustes' }} />
                <LoggedStack.Screen name="profile" component={ProfileData} options={{ title: 'Meus dados' }} />
                <LoggedStack.Screen name="terms" component={UsageTerms} options={{ title: 'Termos de uso' }} />
                <LoggedStack.Screen name="methods" component={WithdrawMethods} options={{ title: 'Métodos de saque' }} />
              </LoggedStack.Navigator>
            )
          : (
              <NotLoggedStack.Navigator screenOptions={{ headerStyle: { elevation: 0 }, ...goBackButton(), ...stackTitlePredefinitions() }}>
                <NotLoggedStack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <NotLoggedStack.Screen name="register" component={Register} options={{ title: 'Novo usuário' }} />
                <LoggedStack.Screen name="terms" component={UsageTerms} options={{ title: 'Termos de uso' }} />
              </NotLoggedStack.Navigator>
            )
      }
    </NavigationContainer>
  );
};

export default Main;
