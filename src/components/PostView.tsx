// import { Alert, View } from 'react-native';
// import { Bookmark } from '@tamagui/lucide-icons';
// import { arrayUnion, doc, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore/lite';
// import { Button, H5, Paragraph, XStack, YStack } from 'tamagui';
// import { db } from '../support/firebase';

// type Props = {
//   post: QueryDocumentSnapshot;
// };

// export function PostView(props: Props) {
//   const post = props.post;
//   const userDocRef = doc(db, 'users', 'oufQkzSGKmZVepCr7O5l');

//   return (
//     <YStack gap={10}>
//       <View key={post.id}>
//         <H5>{post.data().title}</H5>
//         <Paragraph>{post.data().author}</Paragraph>
//         <Paragraph>{post.data().caption}</Paragraph>
//         <XStack gap={20}>
//           <Button
//             p={0}
//             chromeless
//             onPress={async () => {
//               Alert.alert('saved');
//               await updateDoc(userDocRef, {
//                 savedPosts: arrayUnion(post.id),
//               });
//             }}
//           >
//             <Bookmark />
//           </Button>
//         </XStack>
//       </View>
//     </YStack>
//   );
// }

import { Alert, View } from 'react-native';
import { Bookmark } from '@tamagui/lucide-icons';
import { arrayRemove, arrayUnion, doc, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore/lite';
import { Button, H5, Paragraph, XStack, YStack } from 'tamagui';
import { useState } from 'react';
import { db } from '../support/firebase';

type Props = {
  post: QueryDocumentSnapshot;
};

export function PostView(props: Props) {
  const post = props.post;
  const userDocRef = doc(db, 'users', 'oufQkzSGKmZVepCr7O5l');
  const [isSaved, setIsSaved] = useState(false);

  const handleSavePost = async () => {
    try {
      if(isSaved){
        await updateDoc(userDocRef, {
          savedPosts: arrayRemove(post.id),
        });
        setIsSaved(false);
      }
      else{
        await updateDoc(userDocRef, {
          savedPosts: arrayUnion(post.id),
        });
        setIsSaved(true);
        Alert.alert('Post saved!');
      }
      
    } catch (error) {
      console.error('Error saving post:', error);
      Alert.alert('Failed to save post.');
    }
  };

  return (
    <YStack gap={10}>
      <View key={post.id}>
        <H5>{post.data().title}</H5>
        <Paragraph>{post.data().author}</Paragraph>
        <Paragraph>{post.data().caption}</Paragraph>
        <XStack gap={20}>
          <Button
            p={0}
            chromeless
            onPress={handleSavePost}
          >
            <Bookmark fill={isSaved ? 'black' : 'none'} />
          </Button>
        </XStack>
      </View>
    </YStack>
  );
}

