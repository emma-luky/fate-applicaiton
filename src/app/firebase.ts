
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7Y0INGHjVSBvuwVdNgsYximVQi2mu64w",
  authDomain: "fate-application.firebaseapp.com",
  projectId: "fate-application",
  storageBucket: "fate-application.appspot.com",
  messagingSenderId: "154870791897",
  appId: "1:154870791897:web:2a3434b5f7fc6e479f08c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });