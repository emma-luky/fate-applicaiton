import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import { YStack } from 'tamagui';
import { router } from 'expo-router';
import { db } from '../support/firebase';
import { RecipeView } from './RecipeView';
import { getAuth } from 'firebase/auth';

interface RecipeListViewProps {
  filters: string[];
}

/**
 * Renders the list of recipes among all users
 * @param param0 - takes in the different filters a user has selected 
 * @returns the list of recipes
 */
export function RecipeListView({ filters }: RecipeListViewProps) {
  const [recipes, setRecipes] = useState<QueryDocumentSnapshot[]>([]);
  const [user, setUser] = useState<DocumentSnapshot | undefined>(undefined);
  console.log('Filters:', filters);
  useEffect(() => {
    const getUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        setUser(userDocSnap);
      } else {
        console.log('No user signed in');
      }
    };

    const getRecipes = async () => {
      const recipesRef = collection(db, 'recipes');
      const recipesSnapshot = await getDocs(recipesRef);

      const filteredRecipes = [];

      for (const post of recipesSnapshot.docs) {
        const recipeData = post.data();
        // console.log('RecipeData:', post.data().filters);

        const includesAllFilters = filters.every(filter => recipeData.filters?.includes(filter));

        if (includesAllFilters) {
          filteredRecipes.push(post); // Add to the filtered list
        }
      }

      setRecipes(filteredRecipes);
    };

    void getUser();
    void getRecipes();
  }, [filters]);

  return (
    <YStack onPress={() => { router.navigate("/"); }} gap={10} margin={10}>
      {recipes.map((recipe) => (
        <RecipeView key={recipe.id} recipe={recipe} user={user} />
      ))}
    </YStack>
  );
}