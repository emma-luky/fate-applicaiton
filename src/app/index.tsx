import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';
import { ScrollView } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { PostListView } from '../components/PostListView';
export default function App() {
  

  return (
    <>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack.Screen options={{ title: 'Home' }} />
        <ScrollView flex={1}>
          <PostListView />
        </ScrollView>
        <NavBar />
      </TamaguiProvider>
    </>
  );
}
