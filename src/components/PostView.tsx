/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Component that displays a post.
*/

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Alert, View } from 'react-native';
import { Bookmark } from '@tamagui/lucide-icons';
import { arrayRemove, arrayUnion, DocumentSnapshot, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore/lite';
import { Button, H5, Paragraph, XStack, YStack } from 'tamagui';
import { useEffect, useState } from 'react';
import { styles } from '@/assets/styles';

type Props = {
  post: QueryDocumentSnapshot;
  user: DocumentSnapshot | undefined;
};

/**
 * The visulaization of a how a campus post looks like
 * @param props - props object containing the user and post
 * @returns a post
 */
export function PostView(props: Props) {
  const post = props.post;
  const user = props.user;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchUserData = () => {
      if (user?.data()?.savedPosts.includes(post.id)){
        setIsSaved(true);
      }
    };
    fetchUserData();
  }, [user, post.id]);

  const handleSavePost = async () => {
    try {
      if(user){
        if(isSaved){
          await updateDoc(user.ref, {
            savedPosts: arrayRemove(post.id),
          });
          setIsSaved(false);
        }
        else{
          await updateDoc(user.ref, {
            savedPosts: arrayUnion(post.id),
          });
          setIsSaved(true);
          Alert.alert('Post saved!');
        }
      }
    } catch (error) {
      console.error('Error saving post:', error);
      Alert.alert('Failed to save post.');
    }
  };

  return (
    <YStack style={styles.post}>
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

