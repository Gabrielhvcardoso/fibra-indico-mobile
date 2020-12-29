import React from 'react';
import Routes from './src/routes';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import Context from './src/context';

export default function App () {
  const [loaded] = useFonts({
    WorkSans: require('./assets/fonts/WorkSans-Regular.ttf'),
    'WorkSans Light': require('./assets/fonts/WorkSans-Light.ttf'),
    'WorkSans Medium': require('./assets/fonts/WorkSans-Medium.ttf'),
    'WorkSans SemiBold': require('./assets/fonts/WorkSans-SemiBold.ttf'),
    'WorkSans Bold': require('./assets/fonts/WorkSans-Bold.ttf'),
    'WorkSans ExtraBold': require('./assets/fonts/WorkSans-ExtraBold.ttf')
  });

  if (!loaded) return <AppLoading />;

  return (
    <Context>
      <Routes />
    </Context>
  );
}
