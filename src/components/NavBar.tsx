import { Button, XStack, YStack } from 'tamagui'
import { School, CircleUserRound, CookingPot } from '@tamagui/lucide-icons';
import { Alert } from 'react-native';
import { router, Stack } from 'expo-router';

export function NavBar() {

  return (

      <XStack
      flex={0.105}
      justifyContent='space-around'
      borderWidth={2}
      borderColor="$color"
      padding="$2"
      >
        <YStack padding="$2">
          <Button
            p={0}
            chromeless
            onPress={() => {
              router.navigate("/recipe");
            }}
          >
            <CookingPot />
          </Button>
        </YStack>

        <YStack padding="$2">
          <Button
            p={0}
            chromeless
            onPress={() => {
              router.navigate("/index");
            }}
          >
            <School />
          </Button>
          
        </YStack>
        <YStack padding="$2">
          <Button
            p={0}
            chromeless
            onPress={() => {
              router.navigate("/profile");
            }}
          >
            <CircleUserRound />
          </Button>
        </YStack>
      </XStack>
  )
}
