/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';

import icon from '../../assets/icon.png';
import tamaguiConfig from '../config/tamagui.config';

const styles = StyleSheet.create({
  container: {
    padding: 50,
    alignItems: 'center', // Centers items horizontally in the container
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center', // Centers the text
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#70CBCF', // Button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    alignItems: 'center', // Centers the Sign Up button horizontally
  },
});

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'DiShare' }} />
        <Text style={styles.welcomeText}>WELCOME TO DISHARE</Text>

        <Image source={icon} style={styles.image} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.replace('/signin');
          }}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.replace('/signup');
            }}
          >
            <Text style={styles.buttonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TamaguiProvider>
  );
}
