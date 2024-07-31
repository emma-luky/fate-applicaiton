import { QueryDocumentSnapshot } from 'firebase/firestore/lite';

export const generateTsxContent = () => {
  return `
    import React from 'react';
    import { Stack } from 'expo-router';
    import { ScrollView, Text, Image } from 'tamagui';
    import { StyleSheet, View } from 'react-native';

    export default function App() {
      return (
        <>
          <Stack.Screen options={{ title: 'Recipes' }} />
          <ScrollView flex={1}>
            <View style={styles.vertical}>
              <Text
                padding={40}
                fontSize={40}
                fontStyle='italic'
                fontFamily='$silkscreen'
                alignContent='center'
                justifyContent='center'
                textAlign='center'
              >
                {recipe.data().title}
              </Text>
              <Image
                alignSelf='center'
                marginBottom={40}
                width={200}
                height={200}
                source={{ uri: '{String(recipe.data().imageURLs)}' }}
              />
              <Text
                marginLeft={20}
                marginRight={20}
                marginBottom={20}
                fontSize={20}
                fontStyle='italic'
                fontFamily='$silkscreen'
                alignContent='center'
                justifyContent='center'
                textAlign='center'
              >
                {recipe.data().description}
              </Text>
              <View style={styles.tagContainer}>
                <Text> Prep Time -- 60 Minutes </Text>
              </View>
              <View style={styles.tagContainer}>
                <Text> Cook Time -- 30 Minutes </Text>
              </View>
              <View style={styles.tagContainer}>
                <Text> Total Time -- 90 Minutes </Text>
              </View>
              <View style={styles.ingredientContainer}>
                <Text marginTop={5} marginBottom={10}>Ingredients</Text>
                {recipe.data().ingredients.map((ingredient, index) => (
                  <Text key={index}> {ingredient} </Text>
                )).join('')}
              </View>
              <View style={styles.instructionsContainer}>
                {recipe.data().steps.map((step, index) => (
                  <View key={index}>
                    <Text marginTop={5}> Step {index + 1}: </Text>
                    <Text> {step} </Text>
                  </View>
                )).join('')}
              </View>
            </View>
          </ScrollView>
        </>
      );
    }

    const styles = StyleSheet.create({
      vertical: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontSize: 16,
      },
      tagContainer: {
        margin: 5,
        height: 50,
        width: 300,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      },
      ingredientContainer: {
        margin: 5,
        height: 150,
        width: 300,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
      },
      instructionsContainer: {
        margin: 5,
        height: 370,
        width: 300,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
      },
    });
  `;
};