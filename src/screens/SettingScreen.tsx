import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { SETTINGS_ITEMS } from '../data/content';
import { TopBar } from '../components/TopBar';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Setting'>;

/** Settings list — mirrors the Figma Settings frame (display only). */
export function SettingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 56 }]}>
      <StatusBar style="dark" />
      <TopBar
        onPressSettings={() => {}}
        onPressHelp={() => navigation.navigate('Help')}
      />

      <View style={styles.panel}>
        <Text style={styles.title}>Settings</Text>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {SETTINGS_ITEMS.map((item) => (
            <View
              key={item.label}
              style={styles.row}
              accessibilityRole="text"
              accessibilityLabel={`${item.label}${item.value ? `, ${item.value}` : ''}`}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={colors.accent}
                style={styles.rowIcon}
              />
              <Text style={styles.rowLabel}>{item.label}</Text>
              {!!item.value && <Text style={styles.rowValue}>{item.value}</Text>}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screenLight,
    paddingHorizontal: 15,
    paddingBottom: 24,
  },
  panel: {
    flex: 1,
    backgroundColor: colors.panel,
    borderRadius: 24,
    paddingVertical: 24,
  },
  title: {
    color: colors.textOnDark,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 18,
  },
  list: { paddingHorizontal: 24, gap: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  rowIcon: { width: 34 },
  rowLabel: { color: colors.textOnDark, fontSize: 17, fontWeight: '600', flex: 1 },
  rowValue: { color: colors.textMutedOnDark, fontSize: 14 },
});
