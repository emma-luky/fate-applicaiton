import { router, Stack } from 'expo-router';
import { ScrollView, View, Button, Input, Image, Text, Stack as TamaguiStack } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { StyleSheet, Modal, TextInput, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';
import { X, DollarSign, PlusSquare, Plus } from '@tamagui/lucide-icons';
import * as imagePicker from 'expo-image-picker';


export default function RecipePage() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [newRecipeTitle, setRecipeTitle] = useState('');
  const [stepInputValue, setStepInputValue] = useState('');
  const [ingredientInputValue, setIngredientInputValue] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const difficultyComponents = {
    difficulties: [
      {
        label: 'cheap',
        icon: <DollarSign />
      },
      {
        label: 'inexpensive',
        icon: (
          <>
            <DollarSign />
            <DollarSign />
          </>
        )
      },
      {
        label: 'expensive',
        icon: (
          <>
            <DollarSign />
            <DollarSign />
            <DollarSign />
          </>
        )
      }
    ],
  };
    
  const handleButtonPress = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const handleImagePicker = async () => {
    try {
      const result = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log('No image selected or an error occurred');
        return;
      }

      const asset = result.assets[0];

      if (!asset || !asset.uri) {
        console.log('No URI found for the selected asset');
        return;
      }

      setImages([...images, asset.uri]);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const addFilter = () => {
    if (inputValue.trim() !== '') {
      setFilters([...filters, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const addStep = () => {
    setSteps([...steps, stepInputValue.trim()]);
    setStepInputValue('');
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ingredientInputValue.trim()]);
    setIngredientInputValue('');
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack.Screen options={{ title: 'Recipes' }} />
      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <Button onPress={() => setIsFilterVisible(true)} flex={1}>
            <Text>Filter</Text>
          </Button>
          <Input placeholder="Search" flex={2} onPressOut={() => {}} />
          <Button flex={1} onPress={() => setIsCreateVisible(true)} chromeless>
            <PlusSquare size={32} />
          </Button>
        </View>
        <View style={styles.horizontal}>
          {filters.map((filter, index) => (
            <View key={index} style={styles.filterContainer}>
              <Button chromeless onPress={() => removeFilter(index)} fontSize={2}>
                <Button.Text fontSize={11}>{filter}</Button.Text>
                <X />
              </Button>
            </View>
          ))}
        </View>
      </View>
      <ScrollView>
        <View style={styles.horizontal}>
          <Pressable onPress={() => router.navigate("./recipePages/bestChickenNoodleSoup")}>
            <Image
              source={require('../icons/chickenNoodleSoup.jpg')}
              style={styles.postPreviewContainer}
            />
            <Text style={{ marginLeft: 25, fontSize: 15 }}> Chicken Noodle Soup </Text>
            <View style={styles.horizontal}>
              <View marginLeft={20} width={40} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Easy </Text>
              </View>
              <View width={20} style={styles.tagContainer}>
                <View style={styles.horizontal}>
                  <DollarSign size={14} padding={0} />
                </View>
              </View>
              <View width={100} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Rotisserie Chicken </Text>
              </View>
            </View>

            <View style={styles.horizontal}>
              <View width={50} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Noodles </Text>
              </View>
              <View width={42} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Carrots </Text>
              </View>
              <View width={35} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Broth </Text>
              </View>
            </View>
          </Pressable>

          <Pressable onPress={() => alert('image clicked')}>
            <Image
              source={require('../icons/lasagna.jpg')}
              style={styles.postPreviewContainer}
            />
            <Text style={{ marginLeft: 70, fontSize: 15 }}> Lasagna </Text>
            <View style={styles.horizontal}>
              <View width={40} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Hard </Text>
              </View>
              <View width={35} style={styles.tagContainer}>
                <View style={styles.horizontal}>
                  <DollarSign size={14} padding={0} />
                  <DollarSign size={14} padding={0} />
                </View>
              </View>
              <View width={70} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Ground Beef </Text>
              </View>
            </View>

            <View style={styles.horizontal}>
              <View width={90} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Lasagna Noodles </Text>
              </View>
              <View width={50} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Oregano </Text>
              </View>
            </View>
          </Pressable>
        </View>
        <View style={styles.horizontal}>
          <Pressable onPress={() => router.navigate("./recipePages/creamiestMashedPotatoes")}>
            <Image
              source={require('../icons/mashedPotatoes.jpg')}
              style={styles.postPreviewContainer}
            />
            <Text style={{ marginLeft: 10, fontSize: 15 }}> Creamy Mashed Potatoes </Text>
            <View style={styles.horizontal}>
              <View width={50} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Medium </Text>
              </View>
              <View width={20} style={styles.tagContainer}>
                <View style={styles.horizontal}>
                  <DollarSign size={14} padding={0} />
                </View>
              </View>
              <View width={50} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Potatoes </Text>
              </View>
            </View>

            <View style={styles.horizontal}>
              <View width={40} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Milk </Text>
              </View>
              <View width={42} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Butter </Text>
              </View>
              <View width={60} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Seasoning </Text>
              </View>
            </View>
          </Pressable>
          <Pressable onPress={() => alert('image clicked')}>
            <Image
              source={require('../icons/baked-salmon-garnished-with-asparagus-tomatoes-with-herbs.jpg')}
              style={styles.postPreviewContainer}
            />
            <Text style={{ marginLeft: 20, fontSize: 15 }}> Salmon with Asparagus </Text>
            <View style={styles.horizontal}>
              <View width={40} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Hard </Text>
              </View>
              <View width={40} style={styles.tagContainer}>
                <View style={styles.horizontal}>
                  <DollarSign size={14} padding={0} />
                  <DollarSign size={14} padding={0} />
                </View>
              </View>
              <View width={60} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Salmon </Text>
              </View>
            </View>

            <View style={styles.horizontal}>
              <View width={60} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Asparagus </Text>
              </View>
              <View width={50} style={styles.tagContainer}>
                <Text fontSize={10} fontStyle='italic'> Lemon </Text>
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <NavBar />
      <Modal visible={isCreateVisible} transparent={true} animationType='slide'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Recipe Title"
              value={newRecipeTitle}
              onChangeText={setRecipeTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Step"
              value={stepInputValue}
              onChangeText={setStepInputValue}
            />
            <TouchableOpacity onPress={addStep}>
              <Text style={styles.addButton}>Add Step</Text>
            </TouchableOpacity>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <Text>{step}</Text>
                <TouchableOpacity onPress={() => removeStep(index)}>
                  <X />
                </TouchableOpacity>
              </View>
            ))}
            <TextInput
              style={styles.input}
              placeholder="Ingredient"
              value={ingredientInputValue}
              onChangeText={setIngredientInputValue}
            />
            <TouchableOpacity onPress={addIngredient}>
              <Text style={styles.addButton}>Add Ingredient</Text>
            </TouchableOpacity>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientContainer}>
                <Text>{ingredient}</Text>
                <TouchableOpacity onPress={() => removeIngredient(index)}>
                  <X />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={styles.addButton}>Add Image</Text>
            </TouchableOpacity>
            <View style={styles.imagesWrapper}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                  <Image source={{ uri: image }} style={styles.image} />
                  <TouchableOpacity onPress={() => removeImage(index)}>
                    <X />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TouchableOpacity onPress={() => setIsCreateVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={isFilterVisible} animationType="slide">
        <View flex={0.5} />
        <View style={styles.horizontal}>
          {['cheap', 'inexpensive', 'Hard'].map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.button,
                selectedDifficulty === difficulty && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress(difficulty)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedDifficulty === difficulty && styles.selectedButtonText,
                ]}
              >
                {difficulty}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.horizontal}>
  {[].map((difficulty) => (
    <TouchableOpacity
      key={difficulty}
      style={[
        styles.button,
        selectedDifficulty === difficulty && styles.selectedButton,
      ]}
      onPress={() => handleButtonPress(difficulty)}
    >
      <View
        style={[
          styles.buttonText,
          selectedDifficulty === difficulty && styles.selectedButtonText,
        ]}
      >
        {difficulty}
      </View>
    </TouchableOpacity>
  ))}
</View>
        <View style={styles.horizontal}>
          <Button onPress={() => setIsFilterVisible(false)} flex={1} borderRadius={20} height={50} margin={10} chromeless>
            <Text style={{ fontSize: 20 }}>Close</Text>
          </Button>
        </View>
      </Modal>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    padding: 10,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  postPreviewContainer: {
    width: 175,
    height: 175,
    marginBottom: 5,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  tagContainer: {
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  imageContainer: {
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20
  },
  closeButton: {
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 10,
  },imagesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows images to wrap to the next line if necessary
  },container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    height: 50,
    width: 100,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 5,
    fontSize: 50
  },
  selectedButton: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  selectedButtonText: {
    color: 'white',
  },
});