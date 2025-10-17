import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Text, useTheme, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';

export default function HomeScreen() {
  const theme = useTheme();
  const { challenges } = useAppStore();
  const renderChallenge = ({ item }: any) => (
    <Card style={[styles.challengeCard, { borderColor: theme.colors.tertiary, borderWidth: 1 }]}> 
      <Card.Cover source={item.image} />
      <Card.Content>
        <Text variant="titleLarge" style={{ marginTop: 8 }}>
          {item.title} 🏅
        </Text>
        <Text variant="bodyMedium" style={{ marginTop: 4 }}>
          {item.description}
        </Text>
      </Card.Content>
      <Card.Actions style={{ justifyContent: 'center', paddingHorizontal: 16, paddingBottom: 12 }}>
        <Link href="/upload" asChild>
          <Button
            mode="contained"
            icon="upload"
            style={{ alignSelf: 'stretch', borderRadius: 10 }}
            contentStyle={{ paddingVertical: 8 }}
          >
            Submit Video
          </Button>
        </Link>
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text variant="headlineLarge" style={{ fontWeight: '700', color: theme.colors.primary, marginBottom: 12 }}>
          Today’s Challenges
        </Text>
        <FlatList
          data={challenges}
          keyExtractor={(c) => c.id}
          renderItem={renderChallenge}
          contentContainerStyle={{ gap: 16, paddingBottom: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  challengeCard: { borderRadius: 12, overflow: 'hidden' },
});


