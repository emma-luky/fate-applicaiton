import { Stack } from 'expo-router';
import { Avatar, H1, H5, ScrollView, SizableText, Tabs, YStack } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { UserPostsListView } from '../components/UserPostsListView';
import { UserSavedPostsListView } from '../components/UserSavedPostsListView';
import { useEffect, useState } from 'react';
import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore/lite';
import { db } from '../support/firebase';
import { getAuth } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState<DocumentSnapshot>();

  // for when the page loads
  useEffect(() => {
    const getUser = async () => {
      const auth = getAuth();
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
        <H1 alignSelf='center' marginBottom={15}>{user?.data()?.username}</H1>
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
