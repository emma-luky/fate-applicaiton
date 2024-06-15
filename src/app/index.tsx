import { Stack } from 'expo-router';
import { ScrollView } from 'tamagui';

import { PostListView } from '../components/PostListView';

export default function App() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView flex={1}>
        <PostListView></PostListView>
      </ScrollView>
    </>
  );
}
