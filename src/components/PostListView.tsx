import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  DocumentSnapshot
} from 'firebase/firestore/lite';
import { YStack } from 'tamagui';
import { db } from '../support/firebase';
import { PostView } from './PostView';
import { getAuth } from 'firebase/auth';

export function PostListView() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot[]>([]);
  const [user, setUser] = useState<DocumentSnapshot>();
  
  // for when the page loads
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
