import { Alert, View } from 'react-native';
import { Bookmark } from '@tamagui/lucide-icons';
import { QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { Button, H5, Paragraph, XStack, YStack, Image } from 'tamagui';
import { Filters } from './Filters';

type Props = {
  recipe: QueryDocumentSnapshot;
};

export function RecipeView(props: Props) {
  const recipe = props.recipe;

  return (
    <YStack gap={10}>
      <View key={recipe.id}>
        <H5>{recipe.data().title}</H5>
        <Paragraph>{recipe.data().author}</Paragraph>
        {recipe.data().imageUrl !== '#' && <Image
          width="100%"
          aspectRatio={1}
          source={{ uri: String(recipe.data().imageUrl) }}
        />}
        <Paragraph>{recipe.data().caption}</Paragraph>
        <Filters post={recipe}></Filters>
        <XStack gap={20}>
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
      </View>
    </YStack>
  );
}
