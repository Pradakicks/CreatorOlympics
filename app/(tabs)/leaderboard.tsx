import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, Button, Badge, useTheme, Avatar, Divider } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function LeaderboardScreen() {
  const theme = useTheme();
  const { videos, userId } = useAppStore();
  const sorted = [...videos].sort((a, b) => b.votes - a.votes).slice(0, 10);

  const renderItem = ({ item, index }: any) => {
    const rank = index + 1;
    const isMe = item.user === userId;
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
    return (
      <View>
        <View style={[styles.row, isMe && styles.highlight]}>
          <Text style={styles.rank}>{medal}</Text>
          <Avatar.Text size={36} label={item.user.slice(0, 2).toUpperCase()} style={{ backgroundColor: theme.colors.primary }} />
          <View style={styles.info}>
            <Text variant="titleMedium">{item.caption}</Text>
            <Text variant="bodySmall" style={{ color: '#666' }}>by {item.user}</Text>
          </View>
          <Badge style={styles.voteBadge}>{item.votes}</Badge>
        </View>
        <Divider />
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 12 },
  rank: { width: 36, textAlign: 'center', fontSize: 18 },
  info: { flex: 1 },
  voteBadge: { alignSelf: 'center' },
  highlight: { backgroundColor: 'rgba(255, 199, 44, 0.15)', borderRadius: 8 },
});


