/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Alert, ScrollView, View } from 'react-native';
import { Bookmark } from '@tamagui/lucide-icons';
import { arrayRemove, arrayUnion, doc, DocumentSnapshot, getDoc, updateDoc } from 'firebase/firestore/lite';
import { Button, H5, Paragraph, XStack, YStack, Image, H1, H4 } from 'tamagui';
import { Filters } from '../components/Filters';
import { Ingredients } from '../components/Ingredients';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { db } from '../support/firebase';


export default function App() {
    const { recipeId } = useLocalSearchParams<{ recipeId: string }>(); // Destructure the query object
    const [isSaved, setIsSaved] = useState(false);
    const [recipe, setRecipe] = useState<DocumentSnapshot>();
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
            if (recipeId) {
                const recipeDocRef = doc(db, 'recipes', recipeId);
                const recipeDocSnap = await getDoc(recipeDocRef);
                setRecipe(recipeDocSnap);
              } else {
                console.log('No recipe ID provided');
              }
        };
        void getPosts();
    }, []);

  useEffect(() => {
    const fetchUserData = () => {
      if (user?.data()?.savedPosts.includes(recipe?.id)){
        setIsSaved(true);
      }
    };
    fetchUserData();
  }, [user, recipe?.id]);

  const handleSavePost = async () => {
    try {
      if(isSaved){
        await updateDoc(user.ref, {
          savedPosts: arrayRemove(recipe?.id),
        });
        setIsSaved(false);
      }
      else{
        await updateDoc(user.ref, {
          savedPosts: arrayUnion(recipe?.id),
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
        <>
            <Stack.Screen options={{ title: 'Recipe Information' }} />
            <ScrollView>
                <YStack gap={10} margin={20}>
                    <View key={recipe?.id}>
                        <H1 alignSelf='center' textAlign='center'>{recipe?.data()?.title}</H1>
                        <XStack alignItems='center' justifyContent='space-around'>
                            <H4>{recipe?.data()?.author}</H4>
                            <Button
                                p={0}
                                chromeless
                                alignSelf='flex-start'
                                onPress={() => {
                                    Alert.alert('saved');
                                    void handleSavePost();
                                } }
                            >
                                <Bookmark fill={isSaved ? 'black' : 'none'} />
                            </Button>
                        </XStack>
                        <Paragraph alignSelf='center'>{recipe?.data()?.caption}</Paragraph>
                        {recipe?.data()?.imageUrl !== '#' && <Image
                            width="100%"
                            aspectRatio={1}
                            source={{ uri: String(recipe?.data()?.imageUrl) }} />}
                        <H5>Recipe</H5>
                        <Paragraph>{recipe?.data()?.recipe}</Paragraph>
                        <H5>Ingredients</H5>
                        <Ingredients post={recipe}></Ingredients>
                        <H5>Recipe Filters</H5>
                        <Filters post={recipe}></Filters>
                    </View>
                </YStack>
            </ScrollView>
        </>
    );
}