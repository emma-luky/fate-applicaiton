/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: The page containing a form to create a new recipe.
*/

import { Stack } from 'expo-router';
import { ScrollView } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { NewRecipe } from '../components/NewRecipe';
import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { db } from '../support/firebase';

/**
 * Renders a new page that contains the new recipe post form
 * @returns new recipe form
 */
export default function App() {
  const [user, setUser] = useState<DocumentSnapshot>();

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
      <Stack.Screen options={{ title: 'Create New Recipe Post' }} />
      <ScrollView flex={1}>
        <NewRecipe user={user}/>
      </ScrollView>
      <NavBar />
    </>
  );
}