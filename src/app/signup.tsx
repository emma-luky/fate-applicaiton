import React, { useState } from 'react';
import { Alert, Button, TextInput } from 'react-native';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Text, View } from 'tamagui';

import { auth } from './firebase';

function SignUp() {
  const [values, setValues] = useState({ email: '', password: '' });

  const onSubmit = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      console.log(userCredential);
      Alert.alert('Success', 'User registered successfully!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email address is already in use.');
      } else {
        console.error('Error signing up:', error);
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <>
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

        <Button title="Sign Up" onPress={onSubmit} />
      </View>
      <Button
        title="Already have an account? Sign In"
        onPress={() => {
          console.log('Switching to Sign up');
          router.navigate('/signin');
        }}
      />
    </>
  );
}

export default SignUp;
