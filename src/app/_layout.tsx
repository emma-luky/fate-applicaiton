import { Button } from 'react-native';
import { LogIn } from '@tamagui/lucide-icons';
import { router, SplashScreen, Stack } from 'expo-router';
import { Text } from 'tamagui';

import { AppProvider } from '../providers/AppProvider';
import Main from './Main';

void SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'Main',
};

export default function RootLayout() {
  return (
    <AppProvider onInitialized={() => SplashScreen.hideAsync()}>
      <Main />
      <Stack />
    </AppProvider>
  );
}
