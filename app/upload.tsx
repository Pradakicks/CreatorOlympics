import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, TextInput, Snackbar, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/useAppStore';

export default function UploadScreen() {
  const router = useRouter();
  const { submitVideo } = useAppStore();
  const [caption, setCaption] = useState('');
  const [snack, setSnack] = useState(false);

  const onSubmit = () => {
    submitVideo(caption, 'assets/videos/placeholder-video.jpg');
    setSnack(true);
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 700);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>Upload Mock Video</Text>
      <Image source={require('../assets/videos/placeholder-video.jpg')} style={styles.thumb} />
      <TextInput
        label="Caption"
        value={caption}
        onChangeText={setCaption}
        mode="outlined"
        style={{ marginVertical: 12 }}
      />
      <Button mode="contained" onPress={onSubmit} disabled={!caption.trim()}>
        Submit
      </Button>
      <Snackbar visible={snack} onDismiss={() => setSnack(false)} duration={1500}>
        Video submitted!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  thumb: { width: '100%', height: 200, borderRadius: 12 },
});


