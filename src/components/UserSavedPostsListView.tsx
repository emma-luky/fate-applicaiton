/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore/lite';
import { YStack } from 'tamagui';

import { db } from '../support/firebase';
import { PostView } from './PostView';
import { RecipeView } from './RecipeView';

type Props = {
  user: DocumentSnapshot | undefined;
};

export function UserSavedPostsListView(props: Props) {
    const user = props.user;
    const [posts, setPosts] = useState<QueryDocumentSnapshot[]>([]);
    const [recipes, setRecipes] = useState<QueryDocumentSnapshot[]>([]);

  // for when the page loads
  useEffect(() => {
    const fetchedPosts = [] as QueryDocumentSnapshot[];
    const fetchedRecipes = []  as QueryDocumentSnapshot[];
    const getSavedPosts = async () => {
      for (const id of user?.data()?.savedPosts) {
        const postRef = doc(db, 'posts', id);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          fetchedPosts.push(postSnap);
        } else {
          console.log(`Post with ID ${id} not found.`);
        }
  
        const recipeRef = doc(db, 'recipes', id);
        const recipeSnap = await getDoc(recipeRef);
        if (recipeSnap.exists()) {
          fetchedRecipes.push(recipeSnap);
        } else {
          console.log(`Recipe with ID ${id} not found.`);
        }
  
      }
  
      setPosts(fetchedPosts);
      setRecipes(fetchedRecipes);
    }
    void getSavedPosts();
    
  }, [user]);
  
  return (
    <YStack gap={10} margin={10}>
      {posts.map((post) => (
        <PostView key={post.id} post={post} user={user}/>
      ))}
      {recipes.map((recipe) => (
        <RecipeView key={recipe.id} recipe={recipe} user={user} />
      ))}
    </YStack>
  );
}
