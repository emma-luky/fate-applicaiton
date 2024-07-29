import { SplashScreen, Stack } from 'expo-router';

import { AppProvider } from '../providers/AppProvider';

void SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <AppProvider onInitialized={() => SplashScreen.hideAsync()}>
      <Stack />
    </AppProvider>
  );
}
