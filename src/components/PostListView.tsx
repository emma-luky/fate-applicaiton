import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore/lite';
import { YStack } from 'tamagui';
import { db } from '../support/firebase';
import { PostView } from './PostView';

export function PostListView() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot[]>([]);
  const [user, setUser] = useState<QueryDocumentSnapshot[]>();
  
  // for when the page loads
  useEffect(() => {
    const getUser = async () => {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', 'john'));
      const userSnapshot = (await getDocs(q));
      // const userDocRef = doc(db, 'users', 'oufQkzSGKmZVepCr7O5l');
      setUser(userSnapshot.docs);
    }
    void getUser();
    const getPosts = async () => {
      const postsRef = collection(db, 'posts');
      const postsSnapshot = await getDocs(postsRef);
      setPosts(postsSnapshot.docs);
    };
    void getPosts();
  }, []);
  
  return (
    <YStack gap={10} margin={10}>
      {posts.map((post) => (
        <PostView key={post.id} post={post} user={user} />
      ))}
    </YStack>
  );
}
