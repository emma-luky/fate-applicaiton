import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Button, Input, Text } from 'tamagui';
import { ScrollView } from 'tamagui';

interface FilterOptions {
  keyword: string;
  category: string;
  // Add more filter options as needed
}

export const FilterComponent: React.FC<{ onApplyFilters: (filters: FilterOptions) => void }> = ({ onApplyFilters }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const applyFilters = () => {
    onApplyFilters({ keyword, category });
  };

  return (
    <View style={styles.filterContainer}>
      <Input
        style={styles.input}
        placeholder="Keyword"
        value={keyword}
        onChangeText={setKeyword}
      />
      <Input
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button onPress={applyFilters} />
    </View>
  );
};

export const RecipeList: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({ keyword: '', category: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => setIsModalVisible(!isModalVisible);

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    handleModal();
  };

  return (
    <>
      <View style={styles.header}>
        <Button onPress={handleModal} />
        <Input style={styles.searchInput} placeholder="Search" />
        <Button onPress={() => {}} />
      </View>

      {isModalVisible && (
        <FilterComponent onApplyFilters={applyFilters} />
      )}

      <ScrollView style={styles.recipeList}>
        {/* Render the list of recipes based on filters */}
        <Text>Keyword: {filters.keyword}</Text>
        <Text>Category: {filters.category}</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  recipeList: {
    padding: 20,
  },
});