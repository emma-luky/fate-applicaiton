/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { router, Stack } from 'expo-router';
import { ScrollView, View, Button, Input, Image, Text } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { StyleSheet, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';
import { X, PlusSquare, Plus } from '@tamagui/lucide-icons';
import * as imagePicker from 'expo-image-picker';
import { addDoc, collection, QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { db } from '../support/firebase';
import { RecipeListView } from '../components/RecipeListView';
import { styles } from '../../assets/styles';

// type Props = {
//   recipe: QueryDocumentSnapshot;
// };

// export default function App() {
  
//   return (
//     <>
//       <TamaguiProvider config={tamaguiConfig}>
//         <Stack.Screen options={{ title: 'Recipes' }} />
//         <ScrollView flex={1}>
//           <RecipeListView />
//         </ScrollView>
//         <NavBar />
//       </TamaguiProvider>
//     </>
//   );
// }


export default function RecipePage() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [filters, setFilters] = useState<string[]>([]); 
  const [inputValue, setInputValue] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);
  const [filterCost, setFilterCost] = useState('');
  const [createCost, setCreateCost] = useState('');
  const handleFilterDifficultyPress = (difficulty: string) => {
    setFilterDifficulty(difficulty);
  };

  const handleFilterCostPress = (cost: string) => {
    setFilterCost(cost);
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
    // Close the filter modal
    setIsFilterVisible(false);
  };

  const handleCloseFilters = () => {
    setFilters([]); // Clear the filters array
    setCreateCost(''); // Reset selectedCost to null
    setFilterDifficulty(null); // Reset selectedDifficulty to null
    setIsFilterVisible(false); // Close the filter modal
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
          <Button flex={1} onPress={() => {router.navigate("/new-recipe"); setIsCreateVisible(true);}} chromeless>
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
          <RecipeListView/>
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
    </>
  );
}