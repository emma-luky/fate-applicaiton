import { router, Stack } from 'expo-router';
import { ScrollView, View, Button, Input, Image, Text } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { StyleSheet, Modal, TextInput, Pressable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';
import { X, DollarSign, PlusSquare, Plus } from '@tamagui/lucide-icons';
import * as imagePicker from 'expo-image-picker';
import { addDoc, collection, getDocs, getFirestore, query, QueryDocumentSnapshot, where } from 'firebase/firestore/lite';
import { db } from '../support/firebase';

export default function RecipePage() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [postImages, setImages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [newRecipeTitle, setRecipeTitle] = useState('');
  const [stepInputValue, setStepInputValue] = useState('');
  const [ingredientInputValue, setIngredientInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [createDifficulty, setCreateDifficulty] = useState<string | null>(null);
  const [filterCost, setFilterCost] = useState<number | null>(null);
  const [createCost, setCreateCost] = useState<number | null>(null);
  const recipesRef = collection(db, 'recipes');
  const cost = [
    <>
      <View style={styles.horizontal}>
        <DollarSign />
      </View>
    </>,
    <>
      <View style={styles.horizontal}>
        <DollarSign />
        <DollarSign />
      </View>
    </>,
    <>
      <View style={styles.horizontal}>
        <DollarSign />
        <DollarSign />
        <DollarSign />
      </View>
    </>
  ];
  // const [authorName, setAuthorName] = useState<QueryDocumentSnapshot[]>([]);
  // useEffect(() => {
  //   const getUser = async() => {
  //     const usersRef = collection(db, 'users');
  //     const q = query(usersRef, where('username', '==', 'john'));
  //     const userSnapshot = await getDocs(q);
  //     setAuthorName(userSnapshot.docs);
  //   }
  //   void getUser();
  // });

  const handlePostRecipe = async(title: string, author: string, timestamp: number, description: string, ingredients: string[], steps: string[], images: string[], difficulty: any, price: any) => {
    if (difficulty == null){
      throw new Error('Difficulty of recipe must be selected.');
    }

    if (cost == null){
      throw new Error('Approximate cost of recipe must be selected.');
    }
    await addDoc(recipesRef, {
      title: `${title}`,
      author: `${author}`,
      timestamp: `${timestamp}`,
      description: `${description}`,
      ingredients: `${ingredients}`,
      steps: `${steps}`,
      images:  `${images}`,
      difficulty: `${difficulty}`,
      price: `${price}`,
    });
    setIsCreateVisible(false)
  }

  const handleFilterDifficultyPress = (difficulty: string) => {
    setFilterDifficulty(difficulty);
  };

  const handleFilterCostPress = (index: number) => {
    setFilterCost(index);
  };

  const handleCreateDifficultyPress = (difficulty: string) => {
    setCreateDifficulty(difficulty);
  };

  const handleCreateCostPress = (index: number) => {
    setCreateCost(index);
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

      setImages([...postImages, asset.uri]);
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

  const handleSaveFilters = () => {
    const combinedFilters = [];
  
    // Add selected difficulty to filters
    if (filterDifficulty && !filters.includes(`${filterDifficulty}`)) {
      combinedFilters.push(`${filterDifficulty}`);
    }
  
    // Update filters state
    if (combinedFilters.length > 0) {
      setFilters([...filters, ...combinedFilters]);
    }
    // Close the filter modal
    setIsFilterVisible(false);
  };

  const handleCloseFilters = () => {
      setFilters([]); // Clear the filters array
      setCreateCost(null); // Reset selectedCost to null
      setFilterDifficulty(null); // Reset selectedDifficulty to null
      setIsFilterVisible(false); // Close the filter modal
  };

  const handleOpenFilters = () => {
    setIsFilterVisible(true);
  }
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
    setImages(postImages.filter((_, i) => i !== index));
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
      <ScrollView flex={1}>
        <View style={styles.horizontal}>
          {/* <Pressable onPress={() => router.navigate("./recipePages/bestChickenNoodleSoup")}>
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
          </Pressable>v*/}
        </View> 
      </ScrollView>
      <NavBar />
      <Modal id='Post Creation' visible={isCreateVisible} animationType='slide'>
        <ScrollView>
          <View 
            style={styles.vertical}
            margin={30}
            marginTop={80}>
            <Text> </Text>
            <TextInput id = "recipe title"
              style={styles.input}
              placeholder="Recipe Title"
              value={newRecipeTitle}
              onChangeText={setRecipeTitle}
              placeholderTextColor='grey'/>

            <TextInput id="description"
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
              {cost.map((icon, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.button,
                    createCost === index && styles.selectedButton,
                  ]}
                  onPress={() => handleCreateCostPress(index)}>
                  <View
                    style={[
                      styles.buttonText,
                      createCost === index && styles.selectedButtonText,
                    ]}
                  >
                    {icon}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View id="steps" style={styles.horizontal}>
              <TouchableOpacity style={styles.left} onPress={addStep}>
                <View style={styles.horizontal}>
                  <Text width={80} style={styles.addButton}>Add Step</Text>
                  <Plus style={styles.addButton}/>
                </View>
              </TouchableOpacity>
              <Input
                width="70%"
                marginLeft={20}
                style={styles.input}
                value={stepInputValue}
                onChangeText={setStepInputValue}
              />
            </View>
            {steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                  <Text>{step}</Text>
                  <TouchableOpacity onPress={() => removeStep(index)}>
                    <X />
                  </TouchableOpacity>
                </View>
            ))}

            <View id="ingredients" style={styles.horizontal}>
              <TouchableOpacity style={styles.left} onPress={addIngredient}>
                <View style={styles.horizontal}>
                  <Text width={120} style={styles.addButton}>Add Ingredient</Text>
                  <Plus style={styles.addButton}/>
                </View>
              </TouchableOpacity>
              <Input
                marginLeft={20}
                width="60%"
                style={styles.input}
                value={ingredientInputValue}
                onChangeText={setIngredientInputValue}
              />
            </View>
            <View style={styles.horizontal}>
              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientContainer}>
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
                  <Plus style={styles.addButton}/>
                </View>
              </TouchableOpacity>
              <View style={styles.imagesWrapper}>
                {postImages.map((image, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity onPress={() => removeImage(index)}>
                      <X />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>

        <View flex={1} style={styles.horizontal}>
              <TouchableOpacity style={styles.postButton} onPress={() => setIsCreateVisible(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.postButton} onPress={() => 
                handlePostRecipe(newRecipeTitle, 'john',  Date.now(), descriptionValue, ingredients, steps, postImages, createDifficulty, createCost)}>
                <Text style={styles.closeButton}>Post</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </Modal>
      <Modal id ='Post Filter' visible={isFilterVisible} animationType="slide">
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View flex={0.5} />
        <View style={styles.vertical}>
          <View id='difficulty' style={styles.horizontal}>
            {['Easy', 'Medium', 'Hard'].map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.button,
                  filterDifficulty === difficulty && styles.selectedButton,
                ]}
                onPress={() => handleFilterDifficultyPress(difficulty)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    filterDifficulty === difficulty && styles.selectedButtonText,
                  ]}
                >
                  {difficulty}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View id='cost' style={styles.horizontal}>
          {cost.map((icon, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                filterCost === index && styles.selectedButton,
              ]}
              onPress={() => handleFilterCostPress(index)}
            >
              <View
                style={[
                  styles.buttonText,
                  filterCost === index && styles.selectedButtonText,
                ]}x
              >
                {icon}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View id='ingredients' 
          style={styles.vertical}>
          <Input
            marginLeft='40'
            width='80%'
            style={styles.input}
            placeholder="Filter Ingredients"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={addFilter}
            placeholderTextColor='gray'
          />
        </View>
        <View id='filters' style={styles.horizontal}>
          {filters.map((filter, index) => (
              <View key={index}>
                <Button chromeless onPress={() => removeFilter(index)} fontSize={2}>
                  <Button.Text fontSize={11}>{filter}</Button.Text>
                  <X />
                </Button>
              </View>
          ))}
        </View>
          <View style={styles.horizontal}>
            <Button onPress={() => handleCloseFilters()} flex={1} borderRadius={20} height={50} margin={10} chromeless>
              <Text style={{ fontSize: 20 }}>Close</Text>
            </Button>

            <Button onPress={() => handleSaveFilters()} flex={1} borderRadius={20} height={50} margin={10} chromeless>
              <Text style={{ fontSize: 20 }}>Save</Text>
            </Button>
            </View>
          </View>
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
    height: '80%'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 15
  },
  addButton: {
    textAlign: 'center',
    marginBottom: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
    maxWidth: '40%',
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
    backgroundColor: 'cornflowerblue',
    borderColor: 'lightgrey',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center'
  },
  selectedButtonText: {
    flexDirection: 'row',
    color: 'white',
    alignSelf : 'center',
  }, postButton: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 60,
  }, left: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start'
  }
});