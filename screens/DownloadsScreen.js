import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DownloadsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Offline Maps</Text>
      </View>
      <View style={styles.placeholder}>
        <Ionicons name="download-outline" size={64} color="#50C878" />
        <Text style={styles.placeholderTitle}>No Downloads Yet</Text>
        <Text style={styles.placeholderSub}>Download routes for offline access from any Route Details page.{'\n'}Coming in a future sprint.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  title: { fontSize: 22, fontWeight: '800', color: '#222' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  placeholderTitle: { fontSize: 18, fontWeight: '700', color: '#555', marginTop: 16 },
  placeholderSub: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 8, lineHeight: 21 },
});