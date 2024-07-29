import { Stack } from 'expo-router';
import { ScrollView } from 'tamagui';
import { RecipeListView } from '../components/RecipeListView';
import { NavBar } from '../components/NavBar';

export default function App() {
  return (
    <>
      <Stack.Screen options={{ title: 'Recipes' }} />
      <ScrollView flex={1}>
        <RecipeListView />
      </ScrollView>
      <NavBar />
    </>
  );
}
