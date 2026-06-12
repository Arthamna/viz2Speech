import { ModeKey } from '../data/modes';
import { SAMPLE_CAPTIONS } from '../data/content';

/**
 * STUB — replace with a real AI vision call.
 *
 * In production: upload the captured photo (`photoUri`) to your captioning
 * backend along with the active `mode`, which selects the prompt/behaviour:
 *   - document   → OCR / full document read-through
 *   - people     → person detection & description
 *   - environment→ scene / surroundings description
 *   - simple     → short one-line caption
 *   - detail     → rich, fine-grained description
 *
 * For now it simulates network latency and returns the canned caption so the
 * full flow (scan → processing → result → TTS) works end to end offline.
 */
export async function generateCaption(
  mode: ModeKey,
  photoUri?: string,
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return SAMPLE_CAPTIONS[mode];
}
