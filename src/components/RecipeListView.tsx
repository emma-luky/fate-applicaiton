import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import { YStack } from 'tamagui';
import { router } from 'expo-router';
import { db } from '../support/firebase';
import { RecipeView } from './RecipeView';

export function RecipeListView() {
  const [recipes, setRecipes] = useState<QueryDocumentSnapshot[]>([]);

  // for when the page loads
  useEffect(() => {
    const getPosts = async () => {
      const postsRef = collection(db, 'recipes');
      const postsSnapshot = await getDocs(postsRef);
      setRecipes(postsSnapshot.docs);
    };
    void getPosts();
  }, []);
  
  return (
    // will change the route to recipe page.
    <YStack onPress={() => {router.navigate("/");}} gap={10} margin={10}>
      {recipes.map((recipe) => (
        <RecipeView key={recipe.id} recipe={recipe} />
      ))}
    </YStack>
  );
}
