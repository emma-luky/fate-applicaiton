import { LogIn } from '@tamagui/lucide-icons';
import { Stack } from 'expo-router';
import { Avatar, H1, H5, ScrollView, SizableText, Tabs, YStack } from 'tamagui';
import { PostListView } from '../components/PostListView';
import { NavBar } from '../components/NavBar';
import { UserPostsListView } from '../components/UserPostsListView';
import { UserSavedPostsListView } from '../components/UserSavedPostsListView';
import { useEffect, useState } from 'react';
import { collection, getDoc, getDocs, query, QueryDocumentSnapshot, where } from 'firebase/firestore/lite';
import { db } from '../support/firebase';

export default function App() {
  const [user, setUser] = useState<QueryDocumentSnapshot[]>([]);

  // for when the page loads
  useEffect(() => {
    const getUser = async () => {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', 'john'));
      const userSnapshot = (await getDocs(q));
      setUser(userSnapshot.docs);
    }
    void getUser();
  });
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile'
        }}
      />
      <ScrollView flex={5}>
        <H1 alignSelf='center' marginBottom={15}>{user[0]?.data().username}</H1>
        <Avatar circular size='$6' alignSelf='center'>
          <Avatar.Image src='http://picsum.photos/id/177/200/300'/>
        </Avatar>
        <Tabs defaultValue='Posts' marginTop={25}>
          <YStack flexDirection='column' alignItems='center'>
            <Tabs.List>
              <Tabs.Tab value='Posts' width={195}>
                <SizableText>Posts</SizableText>
              </Tabs.Tab>
              <Tabs.Tab value='Saved' width={195}>
                <SizableText>Saved</SizableText>
              </Tabs.Tab>

              <Tabs.Tab value="New" width={125}>
                <SizableText>New</SizableText>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Content value='Posts' alignSelf='flex-start'>
              <UserPostsListView />
            </Tabs.Content>
            <Tabs.Content value='Saved' alignSelf='flex-start'>
              <UserSavedPostsListView />
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
