import React from 'react';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { Stack } from 'expo-router';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0057B7', // Olympic blue
    secondary: '#D61F26', // Olympic red
    tertiary: '#FFC72C', // Olympic gold
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="upload" />
      </Stack>
    </PaperProvider>
  );
}


