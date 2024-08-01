/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Displays recipe posts' ingredients.
*/

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { styles } from '@/assets/styles';
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
                    <SizableText style={styles.descriptionsContainer} key={`${ingredient}-${index}`}>{ ingredient }</SizableText>
                ))}
            </XStack>
        </ScrollView>
    );
}
