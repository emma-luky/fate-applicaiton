/*
    Author: Felisitas Michella Purnomo
    Reviewed By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Allows existing users to sign in.
*/

import { useState } from 'react';
import { Button, Alert } from 'react-native';
import { router, Stack } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TamaguiProvider, Text, Input } from 'tamagui';
import tamaguiConfig from '../config/tamagui.config';

/**
 * Renders a form for a user to sign in
 * @returns user sign-in
 */
export default function App() {
  const [values, setValues] = useState({ email: '', password: '' });
  const auth = getAuth();
  const onSubmit = async () => {
    try{
      await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      router.replace('/post');
    } catch(error) {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.error(errorCode);
      // console.error(errorMessage);
      Alert.alert("username or password is invalid");
    }
  };

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack.Screen options={{ title: 'Sign In' }} />
      <Text> Email </Text>
      <Input
        onChangeText={(text) => setValues({ ...values, email: text })}
        value={values.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text> Password </Text>
      <Input
        onChangeText={(text) => setValues({ ...values, password: text })}
        value={values.password}
        secureTextEntry
      />

      <Button title="Sign In" onPress={onSubmit} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => {
          router.replace('/signup');
        }}
      />
    </TamaguiProvider>
  );
}
