// RouteCard — shared card component used in Browse and Favorites
// Owner: Saad

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DIFF = {
  Easy:     { bg: '#E8F5E9', fg: '#2E7D32' },
  Moderate: { bg: '#FFF3E0', fg: '#E65100' },
  Hard:     { bg: '#FFEBEE', fg: '#C62828' },
};

export default function RouteCard({ route, onPress }) {
  const diff = DIFF[route.difficulty] ?? DIFF.Easy;

  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.85}>
      {route.imageUrl ? (
        <Image source={{ uri: route.imageUrl }} style={s.image} />
      ) : (
        <View style={[s.image, s.imagePlaceholder]}>
          <Ionicons name="map-outline" size={32} color="#ccc" />
        </View>
      )}

      <View style={s.body}>
        <View style={s.titleRow}>
          <Text style={s.name} numberOfLines={1}>{route.name}</Text>
          <View style={[s.badge, { backgroundColor: diff.bg }]}>
            <Text style={[s.badgeText, { color: diff.fg }]}>{route.difficulty}</Text>
          </View>
        </View>

        <View style={s.statsRow}>
          <StatChip icon="navigate-outline" value={`${route.distance} km`} />
          <StatChip icon="time-outline"     value={route.estimatedTime}    />
          {route.petFriendly && (
            <StatChip icon="paw-outline" value="Pet OK" color="#1976D2" />
          )}
        </View>

        <View style={s.ratingRow}>
          <Ionicons name="star" size={13} color="#F5A623" />
          <Text style={s.rating}>{route.rating}</Text>
          <Text style={s.reviews}>({route.reviewCount} reviews)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function StatChip({ icon, value, color = '#555' }) {
  return (
    <View style={s.chip}>
      <Ionicons name={icon} size={13} color={color} />
      <Text style={[s.chipText, { color }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  card:           { backgroundColor: '#fff', borderRadius: 14, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 3 },
  image:          { width: '100%', height: 160 },
  imagePlaceholder:{ backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center' },
  body:           { padding: 14 },
  titleRow:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 },
  name:           { fontSize: 16, fontWeight: '700', color: '#111', flex: 1 },
  badge:          { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6 },
  badgeText:      { fontSize: 12, fontWeight: '600' },
  statsRow:       { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip:           { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#f5f5f5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  chipText:       { fontSize: 12 },
  ratingRow:      { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating:         { fontSize: 13, fontWeight: '600', color: '#333' },
  reviews:        { fontSize: 12, color: '#999' },
});
