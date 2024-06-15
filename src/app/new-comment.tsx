import { Stack } from 'expo-router';
import { Paragraph, YStack } from 'tamagui';

export default function NewCommentForm() {
  return (
    <>
      <Stack.Screen
        options={{ title: 'New Comment', headerBackTitleVisible: false }}
      />
      <YStack flex={1} backgroundColor="white" p={20}>
        <Paragraph>Comment Form will go here.</Paragraph>
      </YStack>
    </>
  );
}
