/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Component that displays the list of posts by the logged in user.
*/

import { useEffect, useState } from 'react';
import {
  collection,
  DocumentSnapshot,
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

/**
 * Renders the lists of posts written by the signed in user
 * @param props - props object containing the user
 * @returns the posts a recipes by the logged in user
 */
export function UserPostsListView(props: Props) {
  const [posts, setPosts] = useState<QueryDocumentSnapshot[]>([]);
  const [recipes, setRecipes] = useState<QueryDocumentSnapshot[]>([]);
  const user = props.user;
  const username = user?.data()?.username;

  useEffect(() => {
    if(username){
      const getPosts = async () => {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('author', '==', username));
        const postsSnapshot = await getDocs(q);
        setPosts(postsSnapshot.docs);
    };
    void getPosts();

    const getRecipes = async () => {
        const recipesRef = collection(db, 'recipes');
        const q = query(recipesRef, where('author', '==', username));
        const recipesSnapshot = await getDocs(q);
        setRecipes(recipesSnapshot.docs);
      };
      void getRecipes();
    }

  }, []);

  
  return (
    <YStack l gap={10} margin={10}>
      {posts.map((post) => (
        <PostView key={post.id} post={post} user={user}/>
      ))}
      {recipes.map((recipe) => (
        <RecipeView key={recipe.id} recipe={recipe} user={user}/>
      ))}
    </YStack>
  );
}
