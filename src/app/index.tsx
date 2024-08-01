import { Button, StyleSheet, Text } from 'react-native';
import { Stack, router } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'center'
  },
});

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack.Screen options={{ title: 'DiShare' }} />
      <Text style={styles.welcomeText}>WELCOME</Text>
      <Button
        title="Sign In"
        onPress={() => {
          console.log('Switching to Sign up');
          router.replace('/signin');
        }}
      />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => {
          router.replace('/signup');
        }}
      />
    </TamaguiProvider>
  );
}
