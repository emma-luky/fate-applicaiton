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

export function UserPostsListView(props: Props) {
  const [posts, setPosts] = useState<QueryDocumentSnapshot[]>([]);
  const [recipes, setRecipes] = useState<QueryDocumentSnapshot[]>([]);
  const user = props.user;

  // for when the page loads
  useEffect(() => {
    const getPosts = async () => {
        const postsRef = collection(db, 'posts');
        const q = query(postsRef, where('author', '==', 'john'));
        const postsSnapshot = await getDocs(q);
        setPosts(postsSnapshot.docs);
    };
    void getPosts();

    const getRecipes = async () => {
        const recipesRef = collection(db, 'recipes');
        const q = query(recipesRef, where('author', '==', 'john'));
        const recipesSnapshot = await getDocs(q);
        setRecipes(recipesSnapshot.docs);
      };
      void getRecipes();
  }, []);
  
  return (
    <YStack gap={10} margin={10}>
      {posts.map((post) => (
        <PostView key={post.id} post={post} user={user}/>
      ))}
      {recipes.map((recipe) => (
        <RecipeView key={recipe.id} recipe={recipe} user={user}/>
      ))}
    </YStack>
  );
}
