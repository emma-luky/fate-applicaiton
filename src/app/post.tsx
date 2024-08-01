/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Displays campus posts from all users part of the application.
*/

import { Stack } from 'expo-router';
import { ScrollView } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { PostListView } from '../components/PostListView';


export default function App() {
  
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView flex={1}>
        <PostListView />
      </ScrollView>
      <NavBar />
    </>
  );
}
