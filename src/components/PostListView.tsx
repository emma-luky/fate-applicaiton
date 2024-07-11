import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite';
import { YStack } from 'tamagui';

import { db } from '../support/firebase';
import { PostView } from './PostView';

export function PostListView() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot[]>([]);

  // for when the page loads
  useEffect(() => {
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
        <PostView key={post.id} post={post} />
      ))}
    </YStack>
  );
}
