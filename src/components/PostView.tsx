/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Alert, View } from 'react-native';
import { Bookmark } from '@tamagui/lucide-icons';
import { arrayRemove, arrayUnion, doc, DocumentReference, getDoc, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore/lite';
import { Button, H5, Paragraph, XStack, YStack } from 'tamagui';
import { useEffect, useState } from 'react';
import { db } from '../support/firebase';

type Props = {
  post: QueryDocumentSnapshot;
  user: QueryDocumentSnapshot[] | undefined;
};

export function PostView(props: Props) {
  const post = props.post;
  const user = props.user;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'users', user[0].id);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.data().savedPosts.includes(post.id)){
        setIsSaved(true);
      }
    };

    void fetchUserData();
  });

  const handleSavePost = async () => {
    try {
      if(isSaved){
        await updateDoc(userDocRef, {
          savedPosts: arrayRemove(post.id),
        });
        setIsSaved(false);
      }
      else{
        await updateDoc(userDocRef, {
          savedPosts: arrayUnion(post.id),
        });
        setIsSaved(true);
        Alert.alert('Post saved!');
      }
      
    } catch (error) {
      console.error('Error saving post:', error);
      Alert.alert('Failed to save post.');
    }
  };

  return (
    <YStack gap={10}>
      <View key={post.id}>
        <H5>{post.data().title}</H5>
        <Paragraph>{post.data().author}</Paragraph>
        <Paragraph>{post.data().caption}</Paragraph>
        <XStack gap={20}>
          <Button
            p={0}
            chromeless
            onPress={handleSavePost}
          >
            <Bookmark fill={isSaved ? 'black' : 'none'} />
          </Button>
        </XStack>
      </View>
    </YStack>
  );
}

