import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';
import { ScrollView } from 'tamagui';
import { PostListView } from '../components/PostListView';
import { NavBar } from '../components/NavBar';
export default function App() {
  

  return (
    <>
       <TamaguiProvider config={tamaguiConfig}>
      {/* Your app components */}
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView flex={1}>
        <PostListView />
      </ScrollView>
      <NavBar />
    </TamaguiProvider>
    </>
  );
}
