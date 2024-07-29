import { Stack } from 'expo-router';
import { H1, ScrollView, Tabs, SizableText, YStack, Avatar } from 'tamagui';
import { NavBar } from '../components/NavBar';
import { UserPostsListView } from '../components/UserPostsListView';
import { UserSavedPostsListView } from '../components/UserSavedPostsListView';

export default function App() {

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile'
        }}
      />
      <ScrollView flex={5}>
        <H1 alignSelf='center' marginBottom={15}>John</H1>
        <Avatar circular size="$6" alignSelf='center'>
          <Avatar.Image src="http://picsum.photos/id/177/200/300"/>
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

            <Tabs.Content value="Posts" alignSelf='flex-start'>
              <UserPostsListView />
            </Tabs.Content>
            <Tabs.Content value="Saved" alignSelf='flex-start'>
              <UserSavedPostsListView />
            </Tabs.Content>
          </YStack>
        </Tabs>
      </ScrollView>
      <NavBar />
    </>
  );
}
