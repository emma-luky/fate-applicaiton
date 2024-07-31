import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';
import { ScrollView } from 'tamagui';
import { RecipeListView } from '../components/RecipeListView';
import { NavBar } from '../components/NavBar';
export default function App() {
  

  return (
    <>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack.Screen options={{ title: 'Recipes' }} />
        <ScrollView flex={1}>
          <RecipeListView />
        </ScrollView>
        <NavBar />
      </TamaguiProvider>
    </>
  );
}
