/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Alert, View } from 'react-native';
import { Bookmark } from '@tamagui/lucide-icons';
import { arrayRemove, arrayUnion, doc, getDoc, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore/lite';
import { Button, H5, Paragraph, XStack, YStack, Image } from 'tamagui';
import { Filters } from './Filters';
import { useEffect, useState } from 'react';
import { db } from '../support/firebase';

type Props = {
  recipe: QueryDocumentSnapshot;
  user: QueryDocumentSnapshot[] | undefined;
};

export function RecipeView(props: Props) {
  const recipe = props.recipe;
  const user = props.user;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'users', user[0].id);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.data().savedPosts.includes(recipe.id)){
        setIsSaved(true);
      }
    };
    void fetchUserData();
  });

  const handleSavePost = async () => {
    try {
      if(isSaved){
        await updateDoc(userDocRef, {
          savedPosts: arrayRemove(recipe.id),
        });
        setIsSaved(false);
      }
      else{
        await updateDoc(userDocRef, {
          savedPosts: arrayUnion(recipe.id),
        });
        setIsSaved(true);
        Alert.alert('Post saved!');
      }
      
    } catch (error) {
      console.error('Error saving post:', error);
      Alert.alert('Failed to save post.');
    }
  }

  return (
    <YStack gap={10}>
      <View key={recipe.id}>
        <H5>{recipe.data().title}</H5>
        <Paragraph>{recipe.data().author}</Paragraph>
        {recipe.data().imageUrl !== '#' && <Image
          width="100%"
          aspectRatio={1}
          source={{ uri: String(recipe.data().imageUrl) }}
        />}
        <Paragraph>{recipe.data().caption}</Paragraph>
        <Filters post={recipe}></Filters>
        <XStack gap={20}>
          <Button
            p={0}
            chromeless
            onPress={() => {
              Alert.alert('saved');
              void handleSavePost();
            }}
          >
            <Bookmark fill={isSaved ? 'black' : 'none'}/>
          </Button>
        </XStack>
      </View>
    </YStack>
  );
}
