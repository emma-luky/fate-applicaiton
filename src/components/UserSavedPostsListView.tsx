import { useEffect, useState } from 'react';
import {
  collection,
  doc,
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

export function UserSavedPostsListView() {
    const [user, setUser] = useState<QueryDocumentSnapshot[]>([]);
    const [posts, setPosts] = useState<QueryDocumentSnapshot[]>([]);
    const [recipes, setRecipes] = useState<QueryDocumentSnapshot[]>([]);

  // for when the page loads
  useEffect(() => {
    const getUser = async () => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', 'john'));
        const userSnapshot = await getDocs(q);
        if(!userSnapshot.empty){
            const userData = userSnapshot.docs[0].data();
            setUser(userSnapshot.docs);
            const fetchedPosts = [];
            const fetchedRecipes = [];
            
            for (const id of userData.savedPosts) {
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
        else{
            console.log('No user found with the username "john".');
        }
        
    };
    void getUser();
  }, []);
  
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
