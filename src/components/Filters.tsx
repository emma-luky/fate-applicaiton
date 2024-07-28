/* eslint-disable @typescript-eslint/no-unsafe-call */
import { QueryDocumentSnapshot } from 'firebase/firestore/lite';
import { Key } from 'react';
import { ScrollView, SizableText, XStack } from 'tamagui';

type Props = {
  post: QueryDocumentSnapshot;
};

export function Filters(props: Props) {
    const post = props.post;
    for (const filter of post.data().filters) {
        console.log(filter);
    }

    return (
        <ScrollView>
            <XStack gap={20}>
                {post.data().filters((filter: Key | null | undefined) => (
                    <SizableText key={ filter }>{ filter }</SizableText>
                ))}
            </XStack>
        </ScrollView>
    );
}
