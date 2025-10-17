import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, Snackbar, Badge, FAB, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { Video } from 'expo-av';

export default function VoteScreen() {
  const theme = useTheme();
  const { videos, vote, canVote, userId, votesUsedToday, seedLocalVideos } = useAppStore();
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const screenH = Dimensions.get('window').height;

  const remaining = 10 - (votesUsedToday[userId] || 0);

  useEffect(() => {
    seedLocalVideos();
  }, [seedLocalVideos]);

  const renderItem = ({ item }: any) => {
    const votedOnThis = useAppStore.getState().votedVideoIdsByUser[userId]?.has(item.id);
    return (
      <View style={[styles.page, { height: screenH }]}> 
        <Video
          source={item.videoUrl}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          isLooping
          shouldPlay
          isMuted
        />
        <View style={styles.bottomLeft}>
          <Text variant="titleMedium" style={styles.textWhite}>@{item.user}</Text>
          <Text variant="bodyLarge" style={styles.textWhite}>{item.caption}</Text>
        </View>
        <View style={styles.rightStack}>
          <FAB
            icon="thumb-up"
            onPress={() => {
              if (!canVote(item.id)) { setSnackbar('Vote limit reached or already voted'); return; }
              vote(item.id); setSnackbar('Voted!');
            }}
            disabled={votedOnThis || remaining <= 0}
            style={[styles.fab, { backgroundColor: votedOnThis ? theme.colors.tertiary : theme.colors.primary }]}
            color={'white'}
          />
          <Badge style={styles.badge}>{item.votes}</Badge>
        </View>
      </View>
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
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlatList
        data={videos}
        keyExtractor={(v) => v.id}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={screenH}
        decelerationRate="fast"
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      />
      <View style={styles.footer} />
      <Snackbar visible={!!snackbar} onDismiss={() => setSnackbar(null)} duration={2000}>
        {snackbar}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { justifyContent: 'flex-end' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  bottomLeft: { position: 'absolute', left: 16, bottom: 72, right: 96 },
  rightStack: { position: 'absolute', right: 16, bottom: 100, alignItems: 'center' },
  textWhite: { color: 'white' },
  fab: { marginBottom: 8 },
  badge: { alignSelf: 'center' },
  footer: { position: 'absolute', bottom: 16, left: 16, right: 16, flexDirection: 'row', alignItems: 'center' },
});


