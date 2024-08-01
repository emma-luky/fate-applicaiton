import { SplashScreen, Stack } from 'expo-router';

import { AppProvider } from '../providers/AppProvider';
import { SafeAreaView } from 'react-native';

void SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <AppProvider onInitialized={() => SplashScreen.hideAsync()}>
      <SafeAreaView style={{backgroundColor: '#d4edf4'}}></SafeAreaView>
      <Stack />
    </AppProvider>
  );
}