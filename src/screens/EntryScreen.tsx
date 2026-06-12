import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { speak } from '../services/speech';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Entry'>;

/** Splash / branding screen. Greets the user aloud, then advances to camera. */
export function EntryScreen({ navigation }: Props) {
  useEffect(() => {
    speak('Selamat datang di Viz2Speech');
    const t = setTimeout(() => navigation.replace('Camera'), 2200);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container} accessibilityLabel="Viz2Speech. Selamat datang.">
      <StatusBar style="dark" />
      <View style={styles.logoWrap}>
        <MaterialCommunityIcons name="eye-outline" size={84} color={colors.purple} />
        <MaterialCommunityIcons
          name="waveform"
          size={40}
          color={colors.primary}
          style={styles.wave}
        />
      </View>
      <Text style={styles.wordmark}>Viz2Speech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  wave: { marginBottom: -6 },
  wordmark: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: '800',
    color: colors.textOnLight,
    letterSpacing: 0.5,
  },
});
