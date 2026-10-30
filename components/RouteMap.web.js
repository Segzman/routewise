// Route map web fallback — react-native-maps has no web support; native gets the real map
// Owner: Sekun

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RouteMap({ coordinates }) {
  return (
    <View style={s.fallback}>
      <Ionicons name="map-outline" size={30} color="#4A90E2" />
      <Text style={s.text}>
        Interactive map available on mobile
        {coordinates?.length ? ` (${coordinates.length} waypoints)` : ''}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  fallback: { width: '100%', height: 220, borderRadius: 12, backgroundColor: '#EDF4FC', alignItems: 'center', justifyContent: 'center', padding: 20 },
  text: { marginTop: 10, fontSize: 14, color: '#4A90E2', textAlign: 'center', fontWeight: '600' },
});
