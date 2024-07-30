/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { ScrollView, SizableText, XStack } from 'tamagui';

type Props = {
  post: QueryDocumentSnapshot;
};

export function Filters(props: Props) {
    const post = props.post;
    const filters = post.data().filters;

    if (!Array.isArray(filters) || filters.length === 0) {
        return null;
    }

    return (
        <ScrollView>
            <XStack gap={20}>
                {filters.map((filter, index) => (
                    <SizableText key={`${filter}-${index}`}>{ filter }</SizableText>
                ))}
            </XStack>
        </ScrollView>
    );
}
