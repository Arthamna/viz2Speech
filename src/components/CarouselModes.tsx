import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModeCard } from './ModeCard';
import { modeAt } from '../data/modes';

interface Props {
  /** Index of the active (centered) mode in the MODES array. */
  activeIndex: number;
}

/**
 * The bottom mode carousel. Shows three cards — previous, active (center),
 * next — exactly like the Figma "Carousel Mode" component. The list is
 * circular, so there is always a card on each side. Mode changes are driven by
 * the two-finger swipe gesture handled in the parent screen.
 */
export function CarouselModes({ activeIndex }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingBottom: insets.bottom + 12 }]}
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
});
