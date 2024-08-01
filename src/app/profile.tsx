/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Displays users' info and posts they are authors of, as well as posts they have saved.
*/

import { router, Stack } from 'expo-router';
import { Avatar, Button, H1, H5, ScrollView, SizableText, Tabs, XStack, YStack } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { UserPostsListView } from '../components/UserPostsListView';
import { UserSavedPostsListView } from '../components/UserSavedPostsListView';
import { useEffect, useState } from 'react';
import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore/lite';
import { db } from '../support/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { LogOut } from '@tamagui/lucide-icons';
import { Alert } from 'react-native';

export default function App() {
  const [user, setUser] = useState<DocumentSnapshot>();
  const auth = getAuth();

  // for when the page loads
  useEffect(() => {
    const getUser = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        console.log('User is signed in:', currentUser);
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        setUser(userDocSnap);
      } else {
        console.log('No user is signed in');
      }
    }
    void getUser();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile'
        }}
      />
      <ScrollView flex={5}>
        <XStack justifyContent='space-around' alignItems='center'>
          <YStack alignItems='center'>
            <H1 flex={1} margin={20}>{user?.data()?.username}</H1>
            <H5 marginBottom={15}>{user?.data()?.school}</H5>
          </YStack>
          <Avatar circular size='$8' alignSelf='center'>
            <Avatar.Image src='http://picsum.photos/id/177/200/300'/>
          </Avatar>
          <Button flex={0.1} onPress={() => {
            signOut(auth).then(() => {
              Alert.alert("Sign out unsuccessful");
              router.replace('/');
            }).catch(() => {
              Alert.alert("Sign out unsuccessful");
            });
          }}>
            <LogOut />
          </Button>
        </XStack>
        
        
        <Tabs defaultValue='Posts' marginTop={25}>
          <YStack flexDirection='column' alignItems='center'>
            <Tabs.List>
              <Tabs.Tab value='Posts' width={195}>
                <SizableText>Posts</SizableText>
              </Tabs.Tab>
              <Tabs.Tab value='Saved' width={195}>
                <SizableText>Saved</SizableText>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Content value='Posts' alignSelf='flex-start'>
              <UserPostsListView user={user}/>
            </Tabs.Content>
            <Tabs.Content value='Saved' alignSelf='flex-start'>
              <UserSavedPostsListView user={user}/>
            </Tabs.Content>

            <Tabs.Content value="New">
              <H5>New Post</H5>
            </Tabs.Content>
          </YStack>
        </Tabs>
      </ScrollView>
      <NavBar />
    </>
  );
}
