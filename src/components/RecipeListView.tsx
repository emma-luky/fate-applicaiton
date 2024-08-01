/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Component that displays the list of recipes.
*/

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

export function RecipeListView({filters } : { filters: string[];
}) {
  const [recipes, setRecipes] = useState<QueryDocumentSnapshot[]>([]);
  const [user, setUser] = useState<DocumentSnapshot>();

  useEffect(() => {
    const getUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if(currentUser){
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        setUser(userDocSnap);
      }
      else{
        console.log('No user signed in');
      }
    }
    void getUser();
    const getPosts = async () => {
      const postsRef = collection(db, 'recipes');
      const postsSnapshot = await getDocs(postsRef);

      // let filteredRecipes = postsSnapshot.docs;
      // if (filters.length > 0) {
      //   filteredRecipes = filteredRecipes.filter((recipe) =>
      //     filters.every((filter) =>
      //       recipe.data().ingredients.includes(filter)
      //     )
      //   );
      // }
      // setRecipes(filteredRecipes);

      setRecipes(postsSnapshot.docs);
    };
    void getPosts();
  }, [filters]);
  
  return (
    <YStack onPress={() => {router.navigate("/");}} gap={10} margin={10}>
      {recipes.map((recipe) => (
        <RecipeView key={recipe.id} recipe={recipe} user={user} />
      ))}
    </YStack>
  );
}
