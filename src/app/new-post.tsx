import { Stack } from 'expo-router';
import { YStack } from 'tamagui';
import { NewMessage } from '../components/NewMessage';

export default function NewPostForm() {
  return (
    <>
      <Stack.Screen
        options={{ title: 'New Post', headerBackTitleVisible: false }}
      />
      <YStack flex={1} backgroundColor="white" p={20}>
        <NewMessage></NewMessage>
      </YStack>
    </>
  );
}
