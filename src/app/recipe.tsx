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
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>([]); 
  const [inputValue, setInputValue] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [filterCost, setFilterCost] = useState('');

  const handleFilterDifficultyPress = (difficulty: string) => {
    if(filterDifficulty === difficulty){
      setFilterDifficulty(null);
      setFilters(filters.filter(filter => filter !== difficulty));
    }else{
      setFilterDifficulty(difficulty);
      if (!filters.includes(difficulty)) {
        setFilters([...filters, difficulty]);
      }
    }
  };

  const handleFilterCostPress = (cost: string) => {
    if (filterCost === cost) {
      setFilterCost('');
      setFilters(filters.filter(filter => filter !== cost));
    } else {
      setFilterCost(cost);
      if (!filters.includes(cost)) {
        setFilters([...filters, cost]);
      }
    }
  };

  const addFilter = (filter) => {
    if (filter.trim() !== '') {
      setFilters([...filters, filter]);
      setInputValue('');
    }
  };

  const removeFilter = (index: number) => {
    const removedFilter = filters[index];
    setFilters((prevFilters) => {
      const newFilters = prevFilters.filter((_, i) => i !== index);
      return newFilters;
    });
    handleFilterCostPress(removedFilter);
    handleFilterDifficultyPress(removedFilter);
  };

  const handleSaveFilters = () => {
    const combinedFilters = [];
    // Add selected cost to filters
    if (filterCost && !filters.includes(filterCost)) {
      combinedFilters.push(filterCost);
    }
    // Add selected difficulty to filters
    if (filterDifficulty && !filters.includes(filterDifficulty)) {
      combinedFilters.push(filterDifficulty);
    }
  
    // Update filters state
    if (combinedFilters.length > 0) {
      setFilters([...filters, ...combinedFilters]);
    }
    // Closes the filter modal
    setIsFilterVisible(false);
  };

  const handleCloseFilters = () => {
    setFilters([]);
    setFilterDifficulty(null);
     // Closes the filter modal
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
                    onPress={() => {
                      handleFilterDifficultyPress(difficulty);
                    }}
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
                    onPress={() => {
                      handleFilterCostPress(cost);
                    }}
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

                <View id='ingredients' 
                  style={styles.vertical}>
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
    </>
  );
}