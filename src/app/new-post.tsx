/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: The page containing a form to create a new post.
*/

import { Stack } from 'expo-router';
import { ScrollView } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { NewPost } from '../components/NewPost';
import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { db } from '../support/firebase';

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
      <Stack.Screen options={{ title: 'Create New Post' }} />
      <ScrollView flex={1}>
        <NewPost user={user}/>
      </ScrollView>
      <NavBar />
    </>
  );
}