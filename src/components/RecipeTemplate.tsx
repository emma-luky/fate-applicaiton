import type { SizeTokens } from 'tamagui'
import React, { useState } from 'react';
import { Button, Input, TextArea, XStack, YStack } from 'tamagui'
export function RecipeTemplate() {

  return (
    <YStack>
      <Input> TITLE </Input>
      <div></div>
      <Input> DESCRIPTION </Input>
      <div></div>
    </YStack>
  );
};
