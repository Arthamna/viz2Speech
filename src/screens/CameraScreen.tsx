import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { MODES, DEFAULT_MODE_INDEX, wrapIndex, modeAt } from '../data/modes';
import { generateCaption } from '../services/captionService';
import { speak } from '../services/speech';
import { TopBar } from '../components/TopBar';
import { CarouselModes } from '../components/CarouselModes';
import { MicButton } from '../components/MicButton';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;
type Phase = 'scan' | 'processing' | 'result';

const SWIPE_THRESHOLD = 40;

export function CameraScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  const [modeIndex, setModeIndex] = useState(DEFAULT_MODE_INDEX);
  const [phase, setPhase] = useState<Phase>('scan');
  const [caption, setCaption] = useState<string>('');

  const activeMode = modeAt(modeIndex);

  // --- Actions ---------------------------------------------------------------

  const changeMode = useCallback((dir: 1 | -1) => {
    setModeIndex((i) => {
      const next = wrapIndex(i + dir);
      Haptics.selectionAsync();
      speak(MODES[next].spokenLabel);
      return next;
    });
    // Changing mode starts a fresh scan.
    setPhase('scan');
    setCaption('');
  }, []);

  const capture = useCallback(async () => {
    if (phase === 'processing') return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPhase('processing');
    speak('Memproses gambar');
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.6 });
      const text = await generateCaption(activeMode.key, photo?.uri);
      setCaption(text);
      setPhase('result');
      speak(text);
    } catch {
      setPhase('scan');
      speak('Maaf, gagal mengambil gambar. Silakan coba lagi.');
    }
  }, [phase, activeMode.key]);

  const goToVQA = useCallback(() => {
    if (phase !== 'result' || !caption) {
      speak('Ambil gambar terlebih dahulu dengan sentuh dua kali.');
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate('VQA', { mode: activeMode.key, caption });
  }, [phase, caption, activeMode.key, navigation]);

  // --- Gestures --------------------------------------------------------------
  // runOnJS(true) lets the callbacks call React state setters directly.

  const gesture = useMemo(() => {
    const doubleTap = Gesture.Tap()
      .numberOfTaps(2)
      .maxDuration(320)
      .runOnJS(true)
      .onEnd(() => capture());

    const threeFingerTap = Gesture.Tap()
      .minPointers(3)
      .maxDuration(400)
      .runOnJS(true)
      .onEnd(() => goToVQA());

    const twoFingerSwipe = Gesture.Pan()
      .minPointers(2)
      .maxPointers(2)
      .runOnJS(true)
      .onEnd((e) => {
        if (Math.abs(e.translationX) > SWIPE_THRESHOLD) {
          changeMode(e.translationX < 0 ? 1 : -1);
        }
      });

    return Gesture.Race(threeFingerTap, twoFingerSwipe, doubleTap);
  }, [capture, goToVQA, changeMode]);

  // --- Permission gate -------------------------------------------------------

  if (!permission) {
    return <View style={styles.permissionContainer} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar style="light" />
        <Text style={styles.permissionText}>
          Viz2Speech memerlukan akses kamera untuk mendeskripsikan sekitarmu.
        </Text>
        <TouchableOpacity
          style={styles.permissionBtn}
          onPress={requestPermission}
          accessibilityRole="button"
          accessibilityLabel="Izinkan akses kamera">
          <Text style={styles.permissionBtnText}>Izinkan Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- Screen ----------------------------------------------------------------

  const a11yLabel =
    `Mode ${activeMode.label}. ` +
    'Sentuh dua kali untuk mengambil gambar. ' +
    'Usap dua jari untuk mengganti mode. ' +
    'Sentuh tiga jari untuk bertanya lanjutan.';

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={styles.container}
        accessible
        accessibilityLabel={a11yLabel}
        accessibilityHint="Layar kamera dengan kontrol berbasis gestur.">
        <StatusBar style="light" />

        <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />

        {/* Caption banner — only after a result is produced. */}
        {phase === 'result' && !!caption && (
          <View style={[styles.captionBanner, { paddingTop: insets.top + 56 }]}>
            <Text style={styles.captionText}>{caption}</Text>
          </View>
        )}

        {/* Processing overlay. */}
        {phase === 'processing' && (
          <View style={styles.processingOverlay} pointerEvents="none">
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.processingText}>Memproses…</Text>
          </View>
        )}

        {/* Mic affordance (visual only) once a caption is shown. */}
        {phase === 'result' && (
          <View style={styles.micWrap} pointerEvents="none">
            <MicButton />
          </View>
        )}

        <TopBar
          variant="onDark"
          onPressSettings={() => navigation.navigate('Setting')}
          onPressHelp={() => navigation.navigate('Help')}
        />

        <CarouselModes activeIndex={modeIndex} />

        {/* Web/desktop fallback: a mouse cannot perform the multi-finger
            gestures, so expose the same actions as buttons. */}
        {Platform.OS === 'web' && (
          <View style={styles.webControls} pointerEvents="box-none">
            <WebButton icon="chevron-left" label="Mode sebelumnya" onPress={() => changeMode(-1)} />
            <WebButton icon="camera" label="Ambil gambar" big onPress={() => capture()} />
            <WebButton icon="comment-question-outline" label="Tanya jawab" onPress={() => goToVQA()} />
            <WebButton icon="chevron-right" label="Mode berikutnya" onPress={() => changeMode(1)} />
          </View>
        )}
      </View>
    </GestureDetector>
  );
}

function WebButton({
  icon,
  label,
  onPress,
  big,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  big?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.webBtn, big && styles.webBtnBig]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <MaterialCommunityIcons
        name={icon as any}
        size={big ? 30 : 24}
        color={colors.textOnDark}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },

  captionBanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.overlay,
    paddingHorizontal: 24,
    paddingBottom: 22,
  },
  captionText: {
    color: colors.textOnDark,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: 'center',
  },

  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  processingText: {
    color: colors.textOnDark,
    fontSize: 16,
    fontWeight: '600',
  },

  micWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  webControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 188,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  webBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webBtnBig: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
  },

  permissionContainer: {
    flex: 1,
    backgroundColor: colors.panelAlt,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 24,
  },
  permissionText: {
    color: colors.textOnDark,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  permissionBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
  },
  permissionBtnText: {
    color: colors.textOnDark,
    fontSize: 16,
    fontWeight: '700',
  },
});
