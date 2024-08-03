/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/*
    Author: Emma Luk
    Reviewd By: Emma Luk
    Date: Summer 2024
    Course:  Seeds

    Description: Component that has a dropdown menu of partnered schools.
*/

import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useMemo, useState } from 'react';
import type { FontSizeTokens, SelectProps } from 'tamagui';
import { Adapt, Select, Sheet, YStack, getFontSize } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient'; // Correct import

/**
 * Drop down menu of available schools (goal is to partner with schools)
 * CITE: @tamagui/select
 * @param param0 - takes in a function that describes the functionality once an item is chosen
 * @returns a dropdown showing the different options
 */
export function SchoolDropdown({ onSchoolSelect, ...props }: SelectProps & { onSchoolSelect: (school: string) => void }) {
  const [val, setVal] = useState('');

  return (
    <Select value={val} onValueChange={(value) => {
      setVal(value);
      onSchoolSelect(value);
    }} disablePreventBodyScroll {...props}>
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Select a school" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={['#ffffff', 'transparent']}
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
          />
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>Schools</Select.Label>
            {useMemo(
              () =>
                items.map((item, i) => (
                  <Select.Item
                    index={i}
                    key={item.name}
                    value={item.name.toLowerCase()}
                  >
                    <Select.ItemText>{item.name}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                )),
              []
            )}
          </Select.Group>
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              <ChevronDown size={getFontSize((props.size as FontSizeTokens) ?? '$true')} />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={['transparent', '#ffffff']}
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

const items = [
  { name: 'University of Utah' },
  { name: 'Salt Lake Community College' },
];
