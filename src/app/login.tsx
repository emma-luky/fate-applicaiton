import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'tamagui';

import { NewUserForm } from '../components/NewUserForm';
import SignUp from './signup';

export default function App() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <ScrollView flex={1}>
        <NewUserForm>
          <SafeAreaView style={{ marginTop: 222 }}></SafeAreaView>
        </NewUserForm>
      </ScrollView>
    </>
  );
}
