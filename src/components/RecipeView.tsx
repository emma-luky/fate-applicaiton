import { Alert, View, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Bookmark } from '@tamagui/lucide-icons';
import { doc, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore/lite';
import { Button, H5, Paragraph, XStack, YStack, Image } from 'tamagui';
import { Filters } from './Filters';
import { db } from '../support/firebase';
import { router } from 'expo-router';

type Props = {
  recipe: QueryDocumentSnapshot;
};

export function RecipeView(props: Props) {
  const { recipe } = props;
  return (
    <YStack gap={10}>
      <View key={recipe.id}>
        <Pressable onPress={() => {
              router.replace("./recipePages/" + recipe.id);
            }}>
          <H5>{recipe.data().title}</H5>
          <Paragraph>{recipe.data().author}</Paragraph>
          {recipe.data().imageURLs !== '#' && (
            <Image
              width="100%"
              aspectRatio={1}
              source={{ uri: String(recipe.data().imageURLs) }}
            />
          )}
          <Paragraph>{recipe.data().caption}</Paragraph>
          <Filters post={recipe} />
          <View style={styles.horizontal}>
            <Paragraph style={styles.tagContainer}> {recipe.data().cost} </Paragraph>
            <Paragraph style={styles.tagContainer}> {recipe.data().difficulty} </Paragraph>
          </View>
          <XStack gap={20}>
            <Button
              p={0}
              chromeless
              onPress={() => {
                Alert.alert('saved');
              }}
            >
              <Bookmark />
            </Button>
          </XStack>
        </Pressable>
      </View>
    </YStack>
  );
}
const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    padding: 10,
  },
  horizontal: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  tagContainer: {
    marginHorizontal: 3,
    minWidth: '10%',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    height: 25,
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});