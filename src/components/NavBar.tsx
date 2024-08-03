/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Component that allows users to navigate to the different pages.
*/

import { Button, XStack, YStack } from 'tamagui'
import { School, CircleUserRound, CookingPot } from '@tamagui/lucide-icons';
import { router } from 'expo-router';

/**
 * Renders the navigation bar that appears on the pottom of each page
 * @returns the navigation bar
 */
export function NavBar() {
  return (
    <XStack
      flex={0.105}
      justifyContent='space-around'
      borderWidth={2}
      borderColor='$color'
      padding='$2'
      >
        <YStack padding='$2'>
          <Button
            p={0}
            chromeless
            onPress={() => {
              router.replace('/recipe');
            }}
          >
            <CookingPot />
          </Button>
        </YStack>

        <YStack padding='$2'>
          <Button
            p={0}
            chromeless
            onPress={() => {
              router.replace('/post');
            }}
          >
            <School />
          </Button>
          
        </YStack>
        <YStack padding='$2'>
          <Button
            p={0}
            chromeless
            onPress={() => {
              router.replace('/profile');
            }}
          >
            <CircleUserRound />
          </Button>
        </YStack>
      </XStack>
  )
}
