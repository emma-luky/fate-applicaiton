/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Displays recipe posts' filters.
*/

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { styles } from '@/assets/styles';
import { DocumentSnapshot } from 'firebase/firestore/lite';
import { ScrollView, SizableText, XStack } from 'tamagui';

type Props = {
  post: DocumentSnapshot | undefined;
};

export function Filters(props: Props) {
    const post = props.post;
    const filters = post?.data()?.filters;

    if (!Array.isArray(filters) || filters.length === 0) {
        return null;
    }

    return (
        <ScrollView>
            <XStack gap={20}>
                {filters.map((filter, index) => (
                    <SizableText style={styles.descriptionsContainer} key={`${filter}-${index}`}>{ filter }</SizableText>
                ))}
            </XStack>
        </ScrollView>
    );
}
