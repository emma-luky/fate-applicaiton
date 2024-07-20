import { Stack } from 'expo-router';
import { ScrollView } from 'tamagui';

import { NewUserForm } from '../components/NewUserForm';

export default function App() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <ScrollView flex={1}>
        <NewUserForm></NewUserForm>
      </ScrollView>
    </>
  );
}
