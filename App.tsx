import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EntryScreen } from './src/screens/EntryScreen';
import { CameraScreen } from './src/screens/CameraScreen';
import { VQAScreen } from './src/screens/VQAScreen';
import { HelpScreen } from './src/screens/HelpScreen';
import { SettingScreen } from './src/screens/SettingScreen';
import type { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Entry"
            screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name="Entry" component={EntryScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen
              name="VQA"
              component={VQAScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="Help"
              component={HelpScreen}
              options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name="Setting"
              component={SettingScreen}
              options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
