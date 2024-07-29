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
  const [recipes, setPosts] = useState<QueryDocumentSnapshot[]>([]);

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
    <YStack gap={10} margin={10}>
      {recipes.map((recipe) => (
        <RecipeView key={recipe.id} recipe={recipe} />
      ))}
    </YStack>
  );
}
