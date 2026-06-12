import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { VQA_PROMPT } from '../data/content';
import { askFollowUp } from '../services/vqaService';
import { speak, stopSpeaking } from '../services/speech';
import { MicButton } from '../components/MicButton';
import { TopBar } from '../components/TopBar';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VQA'>;
type Status = 'listening' | 'processing' | 'answered';

/**
 * Follow-up question screen (reached via the 3-finger tap on a result). Two
 * stacked dark panels per the Figma VQA frames:
 *   - top: the question / prompt
 *   - bottom: the big gold mic while listening, then the spoken answer.
 */
export function VQAScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { caption } = route.params;
  const [status, setStatus] = useState<Status>('listening');
  const [question, setQuestion] = useState<string>(VQA_PROMPT);
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    speak(`${VQA_PROMPT}. Sentuh tombol mikrofon lalu ajukan pertanyaanmu.`);
    return () => stopSpeaking();
  }, []);

  // STUB: tapping the mic simulates recording + transcribing a question.
  const ask = async () => {
    if (status === 'processing') return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setStatus('processing');
    speak('Mendengarkan');
    const spokenQuestion = 'Jelaskan lebih detail gambar tersebut';
    setQuestion(spokenQuestion);
    const res = await askFollowUp(spokenQuestion, caption);
    setAnswer(res.answer);
    setStatus('answered');
    speak(res.answer);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 56 }]}>
      <StatusBar style="dark" />

      <TopBar
        onPressSettings={() => navigation.navigate('Setting')}
        onPressHelp={() => navigation.navigate('Help')}
      />

      {/* Top panel: the question */}
      <View style={[styles.panel, styles.questionPanel]}>
        <Text style={styles.questionText}>{question}</Text>
      </View>

      {/* Bottom panel: mic while listening, answer once available */}
      <View style={[styles.panel, styles.answerPanel]}>
        {status === 'answered' ? (
          <ScrollView contentContainerStyle={styles.answerScroll}>
            <Text style={styles.answerText}>{answer}</Text>
          </ScrollView>
        ) : status === 'processing' ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.accent} />
            <Text style={styles.hint}>Mendengarkan…</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.center}
            onPress={ask}
            accessibilityRole="button"
            accessibilityLabel="Tekan untuk mengajukan pertanyaan">
            <MicButton size={130} active />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Kembali ke kamera">
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenLight,
    paddingHorizontal: 15,
    gap: 16,
  },
  panel: {
    backgroundColor: colors.panel,
    borderRadius: 24,
    padding: 24,
  },
  questionPanel: {
    minHeight: 200,
    justifyContent: 'center',
  },
  questionText: {
    color: colors.textOnDark,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
  },
  answerPanel: {
    flex: 1,
    justifyContent: 'center',
  },
  answerScroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  answerText: {
    color: colors.textOnDark,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 26,
  },
  center: { alignItems: 'center', justifyContent: 'center', gap: 16, flex: 1 },
  hint: { color: colors.textMutedOnDark, fontSize: 16 },
  backBtn: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  backText: { color: colors.textOnLight, fontSize: 16, fontWeight: '600' },
});
