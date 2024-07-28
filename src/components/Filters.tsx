/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { ScrollView, SizableText, XStack } from 'tamagui';

type Props = {
  post: QueryDocumentSnapshot;
};

export function Filters(props: Props) {
    const post = props.post;
    const filters = post.data().filters;

    if (!Array.isArray(filters)) {
        // console.error('Post data filters is undefined or not an array');
        console.error(typeof filters);
        return null;
    }

    console.log('Post ID:', post.id);
    console.log('Filters:', filters);

    return (
        <ScrollView>
            <XStack gap={20}>
                {filters.map((filter) => (
                    <SizableText key={ filter }>{ filter }</SizableText>
                ))}
            </XStack>
        </ScrollView>
    );
}
