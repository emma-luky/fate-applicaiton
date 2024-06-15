import { Alert } from 'react-native';
import { Heart, MessageSquare } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { Button, Image, Paragraph, XStack, YStack } from 'tamagui';

type Props = {
  post: QueryDocumentSnapshot;
};

export function PostView(props: Props) {
  const post = props.post;

  return (
    <YStack gap={10}>
      <Image
        width="100%"
        aspectRatio={1}
        source={{ uri: post.data().imageUrl }}
      />
      <XStack gap={20}>
        <Button
          p={0}
          chromeless
          onPress={() => {
            Alert.alert('liked');
          }}
        >
          <Heart />
        </Button>
        <Button
          p={0}
          chromeless
          onPress={() => {
            router.navigate('/new-comment');
          }}
        >
          <MessageSquare />
        </Button>
      </XStack>
      <Paragraph key={post.id}>{post.data().caption}</Paragraph>
    </YStack>
  );
}
