/*
    Author: Alissa Shaw
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Component to create new post.
*/

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input, View, Text } from 'tamagui';
import { styles } from '../../assets/styles';
import { router } from 'expo-router';
import { addDoc, collection, DocumentSnapshot } from 'firebase/firestore/lite';
import { db } from '../support/firebase';

interface Post {
    author: string;
    caption: string;
    createdAt: string;
    title: string;
} 
type Props = {
    user: DocumentSnapshot | undefined;
};

export function NewPost(props: Props) {
    const user = props.user;
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [newPostTitle, setPostTitle] = useState('');
    const [captionValue, setCaptionValue] = useState('');
    
    const handlePost = async (title: string,
                            caption: string) => {
        if (!title){
            alert('Post must have a title.');
            return;
        }
        if (!caption){
            alert('Post must have a caption.');
            return;
        }
        setIsCreateVisible(false);
        const newPost: Post = {
            author: user?.data()?.username,
            caption: caption,
            createdAt: new Date().toISOString(),
            title: title
          };
    
        try {
            const docRef = await addDoc(collection(db, 'posts'), newPost);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        router.replace('/post');
      };

  return (
        <View
          style={styles.vertical}
          margin={30}
          marginTop={80}>
          <Input id="recipe title"
              style={styles.input}
              placeholder="Post Title"
              value={newPostTitle}
              onChangeText={setPostTitle}
              placeholderTextColor='grey' />

          <Input id="caption"
              style={styles.input}
              placeholder="Caption"
              value={captionValue}
              onChangeText={setCaptionValue}
              placeholderTextColor="grey"
              multiline={true} />

          <View flex={1} style={styles.horizontal}>
              <TouchableOpacity style={styles.postButton} onPress={() => router.replace('/post')}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.postButton} onPress={() => handlePost(newPostTitle, captionValue)}>
                <Text style={styles.closeButton}>Post</Text>
              </TouchableOpacity>
            </View>
        </View>
    );
}
