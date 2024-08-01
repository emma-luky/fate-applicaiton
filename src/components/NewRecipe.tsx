/*
    Author: Alissa Shaw
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Component to create new recipe post.
*/

/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Plus, X } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input, View, Text, Image } from 'tamagui';
import * as imagePicker from 'expo-image-picker';
import { styles } from '../../assets/styles';
import { router } from 'expo-router';
import { addDoc, collection, DocumentSnapshot } from 'firebase/firestore/lite';
import { db } from '../support/firebase';

interface Recipe {
    author: string;
    caption: string;
    createdAt: string;
    filters: string[];
    imageUrl: string;
    ingredients: string[];
    recipe: string;
    title: string;
} 
type Props = {
    user: DocumentSnapshot | undefined;
};

export function NewRecipe(props: Props) {
    const user = props.user;
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [createDifficulty, setCreateDifficulty] = useState<string | null>(null);
    const [createCost, setCreateCost] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [postImage, setImage] = useState<string>();
    const [newRecipeTitle, setRecipeTitle] = useState('');
    const [ingredientInputValue, setIngredientInputValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [captionValue, setCaptionValue] = useState('');
    const filters = [] as string[];

    const handleCreateDifficultyPress = (difficulty: string | null) => {
        if(difficulty){
            filters.push(difficulty);
            setCreateDifficulty(difficulty);
        }
        
      };
    
      const handleCreateCostPress = (cost: string) => {
        filters.push(cost);
        setCreateCost(cost);
      };
    
      const handleImagePicker = async () => {
        try {
          const result = await imagePicker.launchImageLibraryAsync({
            mediaTypes: imagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          });
    
          if (result.canceled || result.assets.length === 0) {
            console.log('No image selected or an error occurred');
            return;
          }
    
          const asset = result.assets[0];
    
          if (!asset.uri) {
            console.log('No URI found for the selected asset');
            return;
          }
    
          setImage(asset.uri);
        } catch (error) {
          console.error('Error picking image:', error);
        }
    };

    const addIngredient = () => {
        setIngredients([...ingredients, ingredientInputValue.trim()]);
        setIngredientInputValue('');
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const removeImage = () => {
        setImage("#");
    };

    const handlePostRecipe = async (title: string,
                            caption: string,
                            recipe: string,
                            difficulty: string,
                            cost: string) => {
        if (!difficulty){
            alert('Difficulty of recipe must be selected.');
            return;
        }
        if (!cost){
            alert('Cost of recipe must be selected.');
            return;
        }
        if (!title){
            alert('Recipe must have a title.');
            return;
        }
        if (!recipe){
            alert('Recipe must have a description.');
            return;
        }
        if (!caption){
            alert('Post must have a caption.');
            return;
        }
        setIsCreateVisible(false);
        const newRecipe: Recipe = {
            author: user?.data()?.username,
            caption: caption,
            createdAt: new Date().toISOString(), // You can set the current date/time
            filters: filters,
            imageUrl: postImage ? postImage : '#',
            ingredients: ingredients,
            recipe: recipe,
            title: title
          };
    
        try {
            const docRef = await addDoc(collection(db, 'recipes'), newRecipe);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        router.dismiss();
      };

  return (
        <><View
          style={styles.vertical}
          margin={30}
          marginTop={80}>
          <Input id="recipe title"
              style={styles.input}
              placeholder="Recipe Title"
              value={newRecipeTitle}
              onChangeText={setRecipeTitle}
              placeholderTextColor='grey' />

          <Input id="caption"
              style={styles.input}
              placeholder="Caption"
              value={captionValue}
              onChangeText={setCaptionValue}
              placeholderTextColor="grey"
              multiline={true} />

          <Input id="description"
              style={styles.input}
              placeholder="Description"
              value={descriptionValue}
              onChangeText={setDescriptionValue}
              placeholderTextColor="grey"
              multiline={true}
              numberOfLines={4} />

          <View id='difficulty' style={styles.horizontal}>
              {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                  <TouchableOpacity
                      key={difficulty}
                      style={[
                          styles.button,
                          createDifficulty === difficulty && styles.selectedButton,
                      ]}
                      onPress={() => handleCreateDifficultyPress(difficulty)}
                  >
                      <Text
                          style={[
                              styles.buttonText,
                              createDifficulty === difficulty && styles.selectedButtonText,
                          ]}
                      >
                          {difficulty}
                      </Text>
                  </TouchableOpacity>
              ))}
          </View>
          <View id='cost' style={styles.horizontal}>
              {['$', '$$', '$$$'].map((cost) => (
                  <TouchableOpacity
                      key={cost}
                      style={[
                          styles.button,
                          createCost === cost && styles.selectedButton,
                      ]}
                      onPress={() => handleCreateCostPress(cost)}
                  >
                      <Text
                          style={[
                              styles.costButtonText,
                              createCost === cost && styles.selectedCostButtonText,
                          ]}
                      >
                          {cost}
                      </Text>
                  </TouchableOpacity>
              ))}
          </View>
          <View id="ingredients" style={styles.horizontal}>
              <TouchableOpacity style={styles.left} onPress={addIngredient}>
                  <View style={styles.horizontal}>
                      <Text width={120} style={styles.addButton}>Add Ingredient</Text>
                      <Plus style={styles.addButton} />
                  </View>
              </TouchableOpacity>
              <Input
                  marginLeft={20}
                  width="60%"
                  style={styles.input}
                  value={ingredientInputValue}
                  onChangeText={setIngredientInputValue} />
          </View>
          <View style={styles.horizontal}>
              {ingredients.map((ingredient, index) => (
                  <View key={index}>
                      <Text>{ingredient}</Text>
                      <TouchableOpacity onPress={() => removeIngredient(index)}>
                          <X />
                      </TouchableOpacity>
                  </View>
              ))}
            </View>
            <View id="images">
                <TouchableOpacity style={styles.left} onPress={handleImagePicker}>
                <View style={styles.horizontal}>
                    <Text width={120} style={styles.addButton}>Choose Image</Text>
                    <Plus style={styles.addButton} />
                </View>
                </TouchableOpacity>
                <View style={styles.imagesWrapper}>
                    {/* {postImages.map((image, index) => ( */}
                    <View style={styles.imageContainer}>
                            <Image source={{ uri: postImage ? postImage : '#' }} style={styles.image} />
                            <TouchableOpacity onPress={() => removeImage()}>
                                <X />
                            </TouchableOpacity>
                        </View>
                        {/* ))} */}
                    </View>
                </View>
            </View>
            <View flex={1} style={styles.horizontal}>
                <TouchableOpacity style={styles.postButton} onPress={() => setIsCreateVisible(false)}>
                    <Text style={styles.closeButton}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.postButton} onPress={() => handlePostRecipe(newRecipeTitle, captionValue, descriptionValue, createDifficulty, createCost)}>
                    <Text style={styles.closeButton}>Post</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
