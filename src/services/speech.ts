import * as Speech from 'expo-speech';

/**
 * Thin wrapper around expo-speech. Centralizes the Indonesian voice config so
 * every spoken cue (mode names, captions, answers) sounds consistent. This app
 * is built for visually impaired users, so almost every state change speaks.
 */
const DEFAULT_OPTIONS: Speech.SpeechOptions = {
  language: 'id-ID',
  pitch: 1.0,
  rate: 1.0,
};

export function speak(text: string, options?: Speech.SpeechOptions) {
  // Interrupt any in-flight utterance so cues never overlap.
  Speech.stop();
  Speech.speak(text, { ...DEFAULT_OPTIONS, ...options });
}

export function stopSpeaking() {
  Speech.stop();
}

export function isSpeaking() {
  return Speech.isSpeakingAsync();
}
