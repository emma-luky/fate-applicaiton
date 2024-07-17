import { Stack } from 'expo-router';
import { H1, ScrollView } from 'tamagui';

import { PostListView } from '../components/PostListView';
import { NavBar } from '../components/NavBar';

export default function App() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerBackTitleVisible: false,
        //   headerBackButtonMenuEnabled: false
        }}
      />
      <ScrollView flex={5}>
        <H1>User Name</H1>
        <PostListView />
      </ScrollView>
      <NavBar />
    </>
  );
}
