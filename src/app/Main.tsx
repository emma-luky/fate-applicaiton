//import React, { useState } from 'react';
//import { router } from 'expo-router';
//import { View } from 'tamagui';

//import SignIn from './signin';
//import SignUp from './signup';

//-----------------------------------------------------------------//

// function Main() {
//  const [isSignUp, setIsSignUp] = useState(true);

// //   // Switch to Sign Up
// //   const switchToSignUp = () => router.navigate('/signin');

//  //   // Switch to Sign In
//  //   const switchToSignIn = () => router.navigate('/signup');

// return <View>{isSignUp ? <SignUp /> : <SignIn />}</View>;
//}

import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
});

function Main() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>WELCOME TO FATE FOOD APP</Text>
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => {
          router.navigate('/signup');
        }}
      />
      <Button
        title="Already have an account? Sign In"
        onPress={() => {
          console.log('Switching to Sign up');
          router.navigate('/signin');
        }}
      />
    </View>
  );
}

export default Main;
