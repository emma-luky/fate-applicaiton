/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { Alert, Button, TextInput } from 'react-native';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Text, View } from 'tamagui';

import { auth } from './firebase'; // Ensure this path is correct

function SignIn() {
  const [values, setValues] = useState({ email: '', password: '' });

  const onSubmit = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      console.log(userCredential);
      Alert.alert('Success', 'User signed in successfully!');
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <Text> Email </Text>
      <TextInput
        onChangeText={(text) => setValues({ ...values, email: text })}
        value={values.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text> Password </Text>
      <TextInput
        onChangeText={(text) => setValues({ ...values, password: text })}
        value={values.password}
        secureTextEntry
      />

      <Button title="Sign In" onPress={onSubmit} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => {
          router.navigate('/signup');
        }}
      />
    </View>
  );
}

export default SignIn;
