/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DocumentSnapshot } from 'firebase/firestore/lite';
import { ScrollView, SizableText, XStack } from 'tamagui';

type Props = {
  post: DocumentSnapshot | undefined;
};

export function Ingredients(props: Props) {
    const post = props.post;
    const ingredients = post?.data()?.ingredients;

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        return null;
    }

    return (
        <ScrollView>
            <XStack flexWrap='wrap'>
                {ingredients.map((ingredient, index) => (
                    <SizableText marginRight={20} key={`${ingredient}-${index}`}>{ ingredient }</SizableText>
                ))}
            </XStack>
        </ScrollView>
    );
}
