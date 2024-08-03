/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Displays campus posts from all users part of the application.
*/

import { router, Stack } from 'expo-router';
import { Button, Input, ScrollView, View } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { useState } from 'react';
import { PostListView } from '../components/PostListView';
import { styles } from '@/assets/styles';
import { PlusSquare } from '@tamagui/lucide-icons';

/**
 * Teh home page, this contains the campus related posts
 * @returns list of posts
 */
export default function App() {
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.vertical}>
        <View style={styles.horizontal}>
          <Input placeholder="Search" flex={2} onPressOut={() => {}} />
          <Button flex={1} onPress={() => {router.replace("/new-post"); setIsCreateVisible(true);}} chromeless>
            <PlusSquare size={32} />
          </Button>
        </View>
      </View>
      <ScrollView flex={1}>
        <PostListView />
      </ScrollView>
      <NavBar />
    </>
  );
}
