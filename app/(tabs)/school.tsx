import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function SchoolScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">School</ThemedText>
      <ThemedText type="subtitle">Welcome to the School tab</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
});
