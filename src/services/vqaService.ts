import { VQA_SAMPLE_ANSWER } from '../data/content';

/**
 * STUB — replace with real Speech-to-Text + Visual-QA.
 *
 * In production:
 *   1. Record audio while the user holds/taps the listening screen.
 *   2. Transcribe it (STT) → `question`.
 *   3. Send `question` + the last caption/photo context to your VQA backend.
 *   4. Return the spoken answer.
 *
 * This stub fakes the round-trip so the VQA screen demonstrates the flow.
 */
export async function askFollowUp(
  question: string,
  lastCaption?: string,
): Promise<{ question: string; answer: string }> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { question, answer: VQA_SAMPLE_ANSWER };
}
