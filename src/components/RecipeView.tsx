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
import { arrayRemove, arrayUnion, DocumentSnapshot, updateDoc } from 'firebase/firestore/lite';
import { Button, H5, Paragraph, XStack, YStack, Image } from 'tamagui';
import { Filters } from './Filters';
import { Ingredients } from './Ingredients';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { styles } from '@/assets/styles';

type Props = {
  recipe: DocumentSnapshot;
  user: DocumentSnapshot | undefined;
};

export function RecipeView(props: Props) {
  const recipe = props.recipe;
  const user = props.user;
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchUserData = () => {
      if (user?.data()?.savedPosts.includes(recipe.id)){
        setIsSaved(true);
      }
    };
    fetchUserData();
  }, [user, recipe.id]);

  const handleSavePost = async () => {
    try {
      if(isSaved){
        await updateDoc(user.ref, {
          savedPosts: arrayRemove(recipe.id),
        });
        setIsSaved(false);
      }
      else{
        await updateDoc(user.ref, {
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
    <YStack style={styles.post} onPress={() => {router.navigate(`/recipe-info?recipeId=${recipe.id}`)}}>
      <View key={recipe.id}>
        <H5>{recipe.data()?.title}</H5>
        <Paragraph>{recipe.data()?.author}</Paragraph>
        <Paragraph>{recipe.data()?.caption}</Paragraph>
        {recipe.data()?.imageUrl !== '#' && <Image
          width="100%"
          aspectRatio={1}
          source={{ uri: String(recipe.data()?.imageUrl) }}
        />}
        <Ingredients post={recipe}></Ingredients>
        <Filters post={recipe}></Filters>
        <XStack gap={20}>
          <Button
            p={0}
            chromeless
            onPress={() => {
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