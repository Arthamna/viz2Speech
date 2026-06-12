import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import type { Mode } from '../data/modes';

interface Props {
  mode: Mode;
  active?: boolean;
}

/**
 * A single carousel card. Active = filled magenta with white icon/label; the
 * two flanking cards are white with their own accent-colored icon.
 */
export function ModeCard({ mode, active = false }: Props) {
  return (
    <View style={[styles.card, active ? styles.cardActive : styles.cardInactive]}>
      <MaterialCommunityIcons
        name={mode.icon as any}
        size={active ? 34 : 28}
        color={active ? colors.textOnDark : mode.color}
      />
      <Text
        style={[styles.label, active ? styles.labelActive : styles.labelInactive]}
        numberOfLines={1}>
        {mode.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cardActive: {
    width: 124,
    height: 124,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cardInactive: {
    width: 96,
    height: 96,
    backgroundColor: colors.cardBg,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  labelActive: { color: colors.textOnDark, fontSize: 12 },
  labelInactive: { color: colors.cardLabel },
});
