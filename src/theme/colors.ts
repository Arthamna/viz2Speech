/**
 * Palette derived from the "True" column of the colorblind-safe palette in the
 * Figma file (UI-IMK). The app deliberately leans on highly saturated, high
 * contrast colors so the few visual cues that exist remain legible.
 */
export const colors = {
  // Brand / state
  primary: '#D6217E', // magenta-pink — active mode card, active caption banner
  accent: '#F5A623', // gold — mic button, gear/help icons, settings list icons
  orange: '#F26419',

  // Mode accent colors (used for inactive carousel icons)
  blue: '#5B8DEF', // People
  green: '#2E8B57', // Environment
  purple: '#7C5CFC', // Detail
  doc: '#1C1C1E', // Document (near-black)

  // Surfaces
  panel: '#262626', // dark rounded panels (Help / Settings / VQA)
  panelAlt: '#1F1F1F',
  overlay: 'rgba(0,0,0,0.78)', // caption banner over the camera feed
  cardBg: '#FFFFFF', // inactive carousel card
  screenLight: '#FFFFFF',
  black: '#000000',

  // Text
  textOnDark: '#FFFFFF',
  textMutedOnDark: 'rgba(255,255,255,0.7)',
  textOnLight: '#1C1C1E',
  cardLabel: '#1C1C1E',
} as const;

export type AppColors = typeof colors;
