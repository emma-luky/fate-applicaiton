import { router, Stack } from 'expo-router';
import { ScrollView, View, Button, Input, Image, Text, Stack as TamaguiStack } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { PostListView } from '../components/PostListView';
import { RecipeTemplate } from '../components/RecipeTemplate';
import { StyleSheet, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';
import { X, DollarSign, PlusSquare, Plus } from '@tamagui/lucide-icons';

export default function RecipePage() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [newRecipeTitle, setRecipeTitle] = useState('');
  const [stepInputValue, setStepInputValue] = useState('');
  const [ingredientInputValue, setIngredientInputValue] = useState('');
  const [tagInputValue, setTagInputValue] = useState('');

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
  const addTag = () => {
    setTags([...tags, tagInputValue.trim()]);
    setTagInputValue('');
  };

  const removeTag = (index: number) => {
  setTags(tags.filter((_, i) => i !== index));
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
        {/* Render the list of recipes based on filters */}
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
      <ScrollView style={styles.recipeSpacing} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.horizontal}>
          <Button style={styles.postPreviewContainer}></Button>
          <Button style={styles.postPreviewContainer}></Button>
        </View>
      </ScrollView>
      <NavBar />
      <Modal visible={isFilterVisible} animationType="slide">
        <View flex={0.5} />
        <View style={styles.horizontal}>
          <Button borderRadius={20} height={50} margin={10}>
            <Button.Text fontSize={15}>Easy</Button.Text>
          </Button>
          <Button borderRadius={20} height={50} margin={10}>
            <Button.Text fontSize={15}>Medium</Button.Text>
          </Button>
          <Button borderRadius={20} height={50} margin={10}>
            <Button.Text fontSize={15}>Hard</Button.Text>
          </Button>
        </View>
        <View style={styles.horizontal}>
          <Button borderRadius={20} height={50} margin={10}>
            <DollarSign padding={0}></DollarSign>
          </Button>
          <Button borderRadius={20} height={50} margin={10}>
            <DollarSign padding={0}></DollarSign>
            <DollarSign padding={0}></DollarSign>
          </Button>
          <Button borderRadius={20} height={50} margin={10}>
            <DollarSign padding={0}></DollarSign>
            <DollarSign padding={0}></DollarSign>
            <DollarSign padding={0}></DollarSign>
          </Button>
        </View>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Filter Ingredients"
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={addFilter}
            placeholderTextColor="gray"
          />
          <Button onPress={addFilter}>
            <Text>Add Filter</Text>
          </Button>
          <TamaguiStack style={styles.horizontal}>
            {filters.map((filter, index) => (
              <View key={index} style={styles.filterContainer}>
                <Button chromeless onPress={() => removeFilter(index)} fontSize={2}>
                  <Button.Text fontSize={11}>{filter}</Button.Text>
                  <X />
                </Button>
              </View>
            ))}
          </TamaguiStack>
          <View style={styles.horizontal}>
            <Button justifyContent="flex-start" margin={50} onPress={() => setIsFilterVisible(false)}>
              <Text fontSize={15}>Close</Text>
            </Button>
            <Button justifyContent="flex-end" margin={50} onPress={() => setIsFilterVisible(false)}>
              <Text fontSize={15}>Save</Text>
            </Button>
          </View>
        </View>
      </Modal>
      <Modal visible={isCreateVisible} animationType="slide">
        <View flex={0.1} />
        <ScrollView flex={2}>
          <View style={styles.vertical} flex={1} />
          <View style={styles.horizontal}>
            <Text fontSize={15} marginRight={10}>
              Title:
            </Text>
            <Input
              onChangeText={setRecipeTitle}
              value={newRecipeTitle}
              placeholderTextColor="gray"
              width={300}
              multiline
              numberOfLines={1}
              height={35}
              fontSize={15}
            />
          </View>
          <Text fontSize={15} marginTop={20} marginHorizontal={20}>
            Description:
          </Text>
          <Input
            onChangeText={setInputValue}
            value={inputValue}
            placeholderTextColor="gray"
            width={382}
            marginHorizontal={25}
            marginVertical={10}
            justifyContent="flex-start"
            alignContent="flex-start"
            multiline
            numberOfLines={5}
            fontSize={15}
          />
          <Button borderRadius={20} justifyContent="flex-start" width={140} marginLeft={25} marginTop={20} onPress={addStep}>
            <Button.Text>Add Step</Button.Text>
            <Plus />
          </Button>
          {steps.map((step, index) => (
              <View key={index} style={styles.horizontal}>
                <Button 
                  borderRadius={20} 
                  onPress={() => removeStep(index)} 
                  fontSize={10}
                  marginLeft={50}>
                  <Button.Text > Step {index+1}</Button.Text>
                </Button>
                <Input
                 
                  placeholderTextColor="gray"
                  width={250}
                  marginHorizontal={10}
                  marginVertical={10}
                  justifyContent="flex-start"
                  alignContent="flex-start"
                  multiline
                  numberOfLines={2}
                  fontSize={15}
                />
              </View>
            ))}
          <Button 
            borderRadius={20} 
            justifyContent="flex-start" 
            width={180} marginLeft={25} 
            marginTop={20} 
            onPress={addIngredient}>
            <Button.Text>Add Ingredient</Button.Text>
            <Plus />
          </Button>
          {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.horizontal}>
                <Button 
                  height={20}
                  borderRadius={20} 
                  onPress={() => removeIngredient(index)} 
                  fontSize={10}
                  marginLeft={50}>
                 <X/>
                </Button>
                <Input
                  placeholderTextColor="gray"
                  width={250}
                  marginHorizontal={10}
                  marginVertical={10}
                  justifyContent="flex-start"
                  alignContent="flex-start"
                  multiline
                  numberOfLines={1}
                  fontSize={15}
                />
              </View>
            ))}

          <Button 
            borderRadius={20} 
            justifyContent="flex-start" 
            width={180} marginLeft={25} 
            marginTop={20} 
            onPress={addTag}>
            <Button.Text>Tags</Button.Text>
            <Plus />
          </Button>
          {tags.map((tag, index) => (
              <View key={index} style={styles.horizontal}>
                <Button 
                  height={20}
                  borderRadius={20} 
                  onPress={() => removeTag(index)} 
                  fontSize={10}
                  marginLeft={50}>
                 <X/>
                </Button>
                <Input
                  placeholderTextColor="gray"
                  width={250}
                  marginHorizontal={10}
                  marginVertical={10}
                  justifyContent="flex-start"
                  alignContent="flex-start"
                  multiline
                  numberOfLines={1}
                  fontSize={15}
                />
              </View>
            ))}
        </ScrollView>
        <View style={styles.horizontal} alignContent="flex-end">
          <Button justifyContent="flex-start" margin={30} onPress={() => setIsCreateVisible(false)}>
            <Text fontSize={15}>Close</Text>
          </Button>
          <Button justifyContent="flex-end" margin={30} onPress={() => setIsCreateVisible(false)}>
            <Button.Text fontSize={15}>Save</Button.Text>
          </Button>
          <Button justifyContent="flex-end" margin={30} onPress={() => setIsCreateVisible(false)}>
            <Button.Text fontSize={15}>Post</Button.Text>
          </Button>
        </View>
      </Modal>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 5,
    fontSize: 16,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    fontSize: 16,
  },
  recipeSpacing: {
    padding: 30,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  filterContainer: {
    height: 35,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  postPreviewContainer: {
    borderRadius: 20,
    height: 150,
    width: 150,
    margin: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
  },
});