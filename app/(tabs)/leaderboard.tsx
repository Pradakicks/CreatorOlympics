import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, Button, Badge } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function LeaderboardScreen() {
  const { videos, userId } = useAppStore();
  const sorted = [...videos].sort((a, b) => b.votes - a.votes).slice(0, 10);

  const renderItem = ({ item, index }: any) => {
    const rank = index + 1;
    const isMe = item.user === userId;
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
    return (
      <Card style={[styles.card, isMe && styles.highlight]}>
        <Card.Title title={`${medal} ${item.caption}`} subtitle={`by ${item.user}`} />
        <Card.Content>
          <Text variant="bodyMedium">Votes: {item.votes}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sorted}
        keyExtractor={(v) => v.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, gap: 12 }}
      />
      <View style={styles.footer}>
        <Link href="/(tabs)" asChild>
          <Button mode="contained">Back Home</Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { borderRadius: 12, overflow: 'hidden' },
  highlight: { borderWidth: 2, borderColor: '#FFC72C' },
  footer: { position: 'absolute', bottom: 16, left: 16, right: 16 },
});


