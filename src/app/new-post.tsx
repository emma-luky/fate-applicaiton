import { useState } from 'react';
import { Stack } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Button, Paragraph, ScrollView, YStack } from 'tamagui';

import { NavBar } from '../components/NavBar';
import { PostListView } from '../components/PostListView';
import { db } from '../support/firebase';

export default function App() {
  const [posts, setPosts] = useState([]);
  return (
    <>
      <Stack.Screen options={{ title: 'HOME' }} />
      <ScrollView flex={1}>
        <PostListView />
      </ScrollView>

      <YStack flex={1} justifyContent="center" alignContent="center">
        <Button
          onPress={async () => {
            const postsRef = collection(db, 'posts');
            const postsSnapshot = await getDocs(postsRef);
          }}
        >
          Post Test
        </Button>
        <YStack gap={10}>
          {posts.map((post) => (
            <Paragraph></Paragraph>
          ))}
        </YStack>
      </YStack>

      <NavBar />
    </>
  );
}
