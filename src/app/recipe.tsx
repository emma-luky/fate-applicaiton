/* eslint-disable @typescript-eslint/no-unsafe-call */
/*
    Author: Alissa Shaw
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Displays recipe posts from all users part of the application.
*/

import { router, Stack } from 'expo-router';
import { ScrollView, View, Button, Input, Text } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { X, PlusSquare } from '@tamagui/lucide-icons';
import { RecipeListView } from '../components/RecipeListView';
import { styles } from '../../assets/styles';

export default function RecipePage() {
  const [filters, setFilters] = useState<string[]>([]);
  const [unsavedFilters, setUnsavedFilters] = useState<string[]>([]);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [filterCost, setFilterCost] = useState('');

  const handleFilterDifficultyPress = (difficulty: string) => {
    setFilterDifficulty(prev => {
      const newDifficulty = prev === difficulty ? null : difficulty;
      setFilters((prevFilters) => {
        const newFilters = prevFilters.filter(filter => filter !== difficulty);
        if (newDifficulty) newFilters.push(newDifficulty);
        return newFilters;
      });
      return newDifficulty;
    });
  };

  const handleFilterCostPress = (cost: string) => {
    setFilterCost(prev => {
      const newCost = prev === cost ? '' : cost;
      setFilters((prevFilters) => {
        const newFilters = prevFilters.filter(filter => filter !== cost);
        if (newCost) newFilters.push(newCost);
        return newFilters;
      });
      return newCost;
    });
  };

  const addFilter = (filter: string) => {
    if (filter.trim() !== '') {
      setUnsavedFilters(prev => [...prev, filter]);
      setInputValue('');
    }
  };

  const saveFilters = () => {
    setFilters(prevFilters => [
      ...prevFilters,
      ...unsavedFilters.filter(filter => !prevFilters.includes(filter))
    ]);
    setUnsavedFilters([]); // Clear unsavedFilters after saving
    setInputValue('');
  };

  const removeFilter = (index: number) => {
    setFilters(prevFilters => {
      const newFilters = prevFilters.filter((_, i) => i !== index);
      return newFilters;
    });
  };

  const handleSaveFilters = () => {
    const combinedFilters = [...filters];
    if (filterCost && !combinedFilters.includes(filterCost)) {
      combinedFilters.push(filterCost);
    }
    if (filterDifficulty && !combinedFilters.includes(filterDifficulty)) {
      combinedFilters.push(filterDifficulty);
    }

    setFilters(combinedFilters);
    saveFilters();
    setIsFilterVisible(false);
  };

  const handleCloseFilters = () => {
    setFilters([]);
    setFilterDifficulty(null);
    setFilterCost('');
    setIsFilterVisible(false);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Recipes' }} />

      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <Button onPress={() => setIsFilterVisible(true)} flex={1}>
            <Text>Filter</Text>
          </Button>
          <Input placeholder="Search" flex={2} onPressOut={() => {}} />
          <Button flex={1} onPress={() => {router.replace("/new-recipe"); setIsCreateVisible(true);}} chromeless>
            <PlusSquare size={32} />
          </Button>
        </View>
        <View id ='filters' style={styles.horizontal}>
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
          <RecipeListView filters={filters}/>
        </View> 
      </ScrollView>
      <NavBar />
      
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
                  {['$', '$$', '$$$'].map((cost) => (
                    <TouchableOpacity
                    key={cost}
                    style={[
                      styles.button,
                      filterCost === cost && styles.selectedButton,
                    ]}
                    onPress={() => handleFilterCostPress(cost)}
                  >
                    <Text
                      style={[
                        styles.costButtonText,
                        filterCost === cost && styles.selectedCostButtonText,
                      ]}
                    >
                      {cost}
                    </Text>
                  </TouchableOpacity>
                  ))}
                </View>

                <View id='ingredients' style={styles.vertical}>
                  <Input
                    marginLeft='40'
                    width='80%'
                    style={styles.input}
                    placeholder="Filter Ingredients"
                    value={inputValue}
                    onChangeText={setInputValue}
                    onSubmitEditing={() => addFilter(inputValue)}
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
                  <Button onPress={handleCloseFilters} flex={1} borderRadius={20} height={50} margin={10} chromeless>
                    <Text style={{ fontSize: 20 }}>Close</Text>
                  </Button>
                  <Button onPress={handleSaveFilters} flex={1} borderRadius={20} height={50} margin={10} chromeless>
                    <Text style={{ fontSize: 20 }}>Save</Text>
                  </Button> 
                </View>
              </View>
            </View>
      </Modal>
    </>
  );
}