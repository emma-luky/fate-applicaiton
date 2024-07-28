import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import { Button, YStack } from 'tamagui';

import { db } from '../support/firebase';
import { RecipeView } from './RecipeView';
import { Alert } from 'react-native';

export function RecipeListView() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot[]>([]);

  // for when the page loads
  useEffect(() => {
    const getPosts = async () => {
      const postsRef = collection(db, 'recipes');
      const postsSnapshot = await getDocs(postsRef);
      setPosts(postsSnapshot.docs);
    };
    void getPosts();
  }, []);
  
  return (
    <Button
      onPress={() => {
      Alert.alert('to recipe');
      }}>
      <YStack gap={10} margin={10}>
        {posts.map((post) => (
          <RecipeView key={post.id} post={post} />
        ))}
      </YStack>
    </Button>
  );
}
