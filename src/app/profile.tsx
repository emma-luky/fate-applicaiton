import { Stack } from 'expo-router';
import { H1, ScrollView, Tabs, SizableText, H5, YStack, Avatar } from 'tamagui';

import { PostListView } from '../components/PostListView';
import { NavBar } from '../components/NavBar';

export default function App() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
          headerBackTitleVisible: false,
        //   headerBackButtonMenuEnabled: false
        }}
      />
      <ScrollView flex={5}>
        <H1 alignSelf='center' marginBottom={15}>User Name</H1>
        <Avatar circular size="$6" alignSelf='center'>
          <Avatar.Image src="http://picsum.photos/200/300"/>
          <Avatar.Fallback bc="red"/>
        </Avatar>
        <Tabs defaultValue="Posts" marginTop={25}>
          <YStack flexDirection='column' alignItems='center'>
            <Tabs.List>
              <Tabs.Tab value="Posts" width={195}>
                <SizableText>Posts</SizableText>
              </Tabs.Tab>
              <Tabs.Tab value="Saved" width={195}>
                <SizableText>Saved</SizableText>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Content value="Posts">
              <H5>Posts</H5>
            </Tabs.Content>
            <Tabs.Content value="Saved">
              <H5>Saved</H5>
            </Tabs.Content>
          </YStack>
        </Tabs>
      </ScrollView>
      <NavBar />
    </>
  );
}
