import React, { useMemo, useState } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Text, Snackbar, Badge } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function VoteScreen() {
  const { videos, vote, canVote, userId, votesUsedToday } = useAppStore();
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const remaining = 10 - (votesUsedToday[userId] || 0);

  const handleVote = (id: string) => {
    if (!canVote(id)) {
      setSnackbar('Vote limit reached or already voted on this video.');
      return;
    }
    vote(id);
    setSnackbar('Voted!');
  };

  const renderItem = ({ item }: any) => {
    const votedOnThis = useAppStore.getState().votedVideoIdsByUser[userId]?.has(item.id);
    return (
      <Card style={styles.card}>
        <Card.Cover source={require('../../assets/videos/placeholder-video.jpg')} />
        <Card.Title title={item.user} subtitle={item.caption} />
        <Card.Content>
          <Text variant="bodyMedium">Votes: {item.votes}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => handleVote(item.id)} disabled={votedOnThis || remaining <= 0}>
            👍 Vote
          </Button>
          <View style={{ marginLeft: 8 }}>
            <Badge>{remaining}/10</Badge>
          </View>
        </Card.Actions>
      </Card>
    );
  };

  if (videos.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="titleMedium" style={{ marginBottom: 12 }}>No videos yet.</Text>
        <Link href="/upload" asChild>
          <Button mode="contained">Submit your first video</Button>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(v) => v.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, gap: 12 }}
      />
      <View style={styles.footer}>
        <Link href="/(tabs)/leaderboard" asChild>
          <Button mode="outlined">See Finalists</Button>
        </Link>
      </View>
      <Snackbar visible={!!snackbar} onDismiss={() => setSnackbar(null)} duration={2000}>
        {snackbar}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { marginBottom: 12, borderRadius: 12, overflow: 'hidden', marginHorizontal: 16 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  footer: { position: 'absolute', bottom: 16, left: 16, right: 16 },
});


