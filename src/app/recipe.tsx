import { router, Stack } from 'expo-router';
import { ScrollView, View, Button, Input, Image, Text, Stack as TamaguiStack } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { PostListView } from '../components/PostListView';
import { RecipeTemplate } from '../components/RecipeTemplate';
import { StyleSheet, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';
import { X, DollarSign, PlusSquare } from '@tamagui/lucide-icons';

export default function RecipePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addFilter = () => {
    if (inputValue.trim() !== '') {
      setFilters([...filters, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack.Screen options={{ title: 'Recipes' }} />
      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <Button
            onPress={() => setIsModalVisible(true)}
            flex={1}
          >
            <Text> Filter </Text>
          </Button>
          <Input
            placeholder="Search"
            flex={2}
            onPressOut={() => {}}
          />
          <Button
            flex={1}
            onPress={() => {<RecipeTemplate />}}
            chromeless
          >
            <PlusSquare size={32}/>
          </Button>
        </View>
        {/* Render the list of recipes based on filters */}
        <View style={styles.horizontal}>
          {filters.map((filter, index) => (
                <View key={index} style={styles.filterContainer}>
                  <Button chromeless onPress={() => removeFilter(index)} fontSize={2}>
                    <Button.Text fontSize={11}>{filter}</Button.Text>
                    <X/>
                  </Button>
                </View>
              ))}
        </View>
      </View>
      <ScrollView style={styles.recipeSpacing} contentContainerStyle={{ flexGrow: 1 }}>
        
        <View style={styles.horizontal}>
        <Button style={styles.postPreviewContainer}>
        </Button>
        <Button style={styles.postPreviewContainer}>
        </Button>
        </View>
      </ScrollView>
      <NavBar/>
      <Modal visible={isModalVisible} animationType="slide">
        <View flex={0.5}/>
      <View style={styles.horizontal}>
        <Button borderRadius={20} height={50} margin={10}>
           <Button.Text fontSize={15}> Easy </Button.Text>
         </Button>
         <Button borderRadius={20} height={50} margin={10}>
          <Button.Text fontSize={15}> Medium </Button.Text>
        </Button>
        <Button borderRadius={20} height={50} margin={10}>
          <Button.Text fontSize={15}> Hard </Button.Text>
        </Button>
      </View>

      <View style={styles.horizontal}>
        <Button borderRadius={20} height={50} margin={10}>
          <DollarSign padding={0}></DollarSign>
        </Button>
        <Button borderRadius={20} height={50} margin={10}>
        <DollarSign padding={0} ></DollarSign>
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
            placeholderTextColor='gray'
          />
          <Button onPress={addFilter}>
            <Text>Add Filter</Text>
          </Button>

          <TamaguiStack style={styles.horizontal}>
          {filters.map((filter, index) => (
              <View key={index} style={styles.filterContainer}>
                <Button chromeless onPress={() => removeFilter(index)} fontSize={2}>
                  <Button.Text fontSize={11}>{filter}</Button.Text>
                 <X/>
                </Button>
              </View>
            ))}
          </TamaguiStack>
          <View style={styles.horizontal}>
          <Button justifyContent='flex-start' margin={50} onPress={() => setIsModalVisible(false)}>
            <Text fontSize={15} >Close</Text>
          </Button>
          <Button justifyContent='flex-end' margin={50} onPress={() => setIsModalVisible(false)}>
            <Text fontSize={15} >Save</Text>
          </Button>
          </View>
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
    width: '80%'
  },
  filterContainer: {
    height: 35, 
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  }, postPreviewContainer: {
    borderRadius: 20,
    height: 150,
    width: 150,
    margin: 20
  }
});

