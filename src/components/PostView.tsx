import { Alert } from 'react-native';
import { Bookmark, Heart } from '@tamagui/lucide-icons';
import { QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { Button, Paragraph, SizableText, XStack, YStack } from 'tamagui';

type Props = {
  post: QueryDocumentSnapshot;
};

export function PostView(props: Props) {
  const post = props.post;

  return (
    <YStack gap={10}>
      <SizableText>Text</SizableText>
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
            Alert.alert('saved');
          }}
        >
          <Bookmark />
        </Button>
      </XStack>
      <Paragraph key={post.id}>{post.data().caption}</Paragraph>
    </YStack>
  );
}
