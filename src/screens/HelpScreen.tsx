import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { colors } from '../theme/colors';
import { HELP } from '../data/content';
import { TopBar } from '../components/TopBar';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Help'>;

/** Static help / onboarding content, verbatim from the Figma Help frame. */
export function HelpScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.screen, { paddingTop: insets.top + 56 }]}>
      <StatusBar style="dark" />
      <TopBar
        onPressSettings={() => navigation.navigate('Setting')}
        onPressHelp={() => {}}
      />

      <View style={styles.panel}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{HELP.title}</Text>
          <Text style={styles.intro}>{HELP.intro}</Text>

          <Text style={styles.guideHeading}>{HELP.guideHeading}</Text>
          {HELP.items.map((item) => (
            <View key={item.title} style={styles.item}>
              <Text style={styles.bullet}>
                <Text style={styles.itemTitle}>{`• ${item.title}: `}</Text>
                <Text style={styles.itemBody}>{item.body}</Text>
              </Text>
              {'sub' in item &&
                item.sub?.map((s) => (
                  <Text key={s.title} style={styles.subBullet}>
                    <Text style={styles.subTitle}>{`◦ ${s.title}: `}</Text>
                    <Text style={styles.itemBody}>{s.body}</Text>
                  </Text>
                ))}
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
    overflow: 'hidden',
  },
  content: { padding: 24, paddingBottom: 40, gap: 14 },
  title: {
    color: colors.textOnDark,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  intro: { color: colors.textOnDark, fontSize: 14, lineHeight: 21, fontWeight: '600' },
  guideHeading: {
    color: colors.textOnDark,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 8,
  },
  item: { gap: 8 },
  bullet: { lineHeight: 21 },
  itemTitle: { color: colors.textOnDark, fontSize: 14, fontWeight: '700' },
  itemBody: { color: colors.textMutedOnDark, fontSize: 14 },
  subBullet: { lineHeight: 20, paddingLeft: 18 },
  subTitle: { color: colors.textOnDark, fontSize: 13.5, fontWeight: '700' },
});
