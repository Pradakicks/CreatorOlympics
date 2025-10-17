import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function HomeScreen() {
  const theme = useTheme();
  const { challenges } = useAppStore.getState();
  const challenge = challenges[0];

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={{ fontWeight: '700', color: theme.colors.primary, marginBottom: 12 }}>
        Today’s Challenge
      </Text>
      <Card style={styles.card}>
        <Card.Cover source={challenge?.image} />
        <Card.Content>
          <Text variant="titleLarge" style={{ marginTop: 8 }}>
            {challenge?.title}
          </Text>
          <Text variant="bodyMedium" style={{ marginTop: 4 }}>
            {challenge?.description}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Link href="/upload" asChild>
          <Button mode="contained" style={styles.button}>
            Submit Video
          </Button>
        </Link>
        <Link href="/(tabs)/vote" asChild>
          <Button mode="contained-tonal" style={styles.button}>
            Vote Now
          </Button>
        </Link>
        <Link href="/(tabs)/leaderboard" asChild>
          <Button mode="outlined" style={styles.button}>
            View Leaderboard
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  card: { borderRadius: 12, overflow: 'hidden' },
  actions: { marginTop: 16, gap: 10 },
  button: { borderRadius: 8 },
});


