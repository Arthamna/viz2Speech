import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Props {
  size?: number;
  style?: ViewStyle;
  /** Pulsing/active look while listening. */
  active?: boolean;
}

/**
 * The gold circular microphone affordance seen on the Result and VQA screens.
 * It is purely visual feedback — capture / questions are triggered by gestures,
 * not by tapping it — so it is hidden from the accessibility tree.
 */
export function MicButton({ size = 88, style, active = false }: Props) {
  return (
    <View
      style={[
        styles.btn,
        { width: size, height: size, borderRadius: size / 2 },
        active && styles.active,
        style,
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <MaterialCommunityIcons name="microphone" size={size * 0.5} color={colors.textOnDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOpacity: 0.5,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  active: {
    shadowOpacity: 0.9,
    shadowRadius: 22,
  },
});
