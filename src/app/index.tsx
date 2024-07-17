import { Stack } from 'expo-router';
import { ScrollView } from 'tamagui';

import { PostListView } from '../components/PostListView';
import { NavBar } from '../components/NavBar';

export default function App() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView flex={1}>
        <PostListView />
      </ScrollView>
      <NavBar />
    </>
  );
}
