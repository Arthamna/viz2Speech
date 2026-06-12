import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

interface Props {
  onPressSettings: () => void;
  onPressHelp: () => void;
  /** When the screen behind is dark (camera/result), use a lighter chip. */
  variant?: 'onLight' | 'onDark';
}

/**
 * Gear (settings) + question-mark (help) buttons that float at the top of every
 * screen, exactly as in the Figma frames: gear on the left, help on the right,
 * both gold on a subtle circular chip.
 */
export function TopBar({ onPressSettings, onPressHelp, variant = 'onLight' }: Props) {
  const insets = useSafeAreaInsets();
  const chipStyle = [
    styles.chip,
    variant === 'onDark' ? styles.chipOnDark : styles.chipOnLight,
  ];

  return (
    <View style={[styles.row, { top: insets.top + 8 }]} pointerEvents="box-none">
      <TouchableOpacity
        style={chipStyle}
        onPress={onPressSettings}
        accessibilityRole="button"
        accessibilityLabel="Pengaturan"
        hitSlop={12}>
        <MaterialCommunityIcons name="cog" size={22} color={colors.accent} />
      </TouchableOpacity>

      <TouchableOpacity
        style={chipStyle}
        onPress={onPressHelp}
        accessibilityRole="button"
        accessibilityLabel="Bantuan"
        hitSlop={12}>
        <MaterialCommunityIcons name="help" size={20} color={colors.accent} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  chip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  chipOnLight: {
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  chipOnDark: {
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
});
