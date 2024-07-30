import { Alert } from 'react-native';
import { Button, XStack, YStack } from 'tamagui'
import { School, CircleUserRound, CookingPot } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { Button, XStack, YStack } from 'tamagui';

export function NavBar() {
  return (
    <XStack
      flex={0.105}
      justifyContent="space-around"
      borderWidth={2}
      borderColor="$color"
      padding="$2"
      >
        <YStack padding="$2">
          <Button
            p={0}
            chromeless
            onPress={() => {
              router.replace("/recipe");
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
              router.replace("/");
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
              router.replace("/profile");
            }}
          >
            <CircleUserRound />
          </Button>
        </YStack>
      </XStack>
  )
}
