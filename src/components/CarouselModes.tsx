import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ModeCard } from './ModeCard';
import { modeAt } from '../data/modes';
import { colors } from '../theme/colors';

interface Props {
  /** Index of the active (centered) mode in the MODES array. */
  activeIndex: number;
}

/**
 * The bottom mode carousel — the Figma "Carousel Mode" component. It shows
 * three cards (previous · active · next) centered in a 150px-tall white strip,
 * with a 15px gap between cards. The list is circular so there is always a card
 * on each side. Mode changes come from the two-finger swipe in the parent.
 */
export function CarouselModes({ activeIndex }: Props) {
  return (
    <View
      style={styles.container}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <View style={styles.row}>
        <ModeCard mode={modeAt(activeIndex - 1)} />
        <ModeCard mode={modeAt(activeIndex)} active />
        <ModeCard mode={modeAt(activeIndex + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: colors.screen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
});
