// Route details screen — FR2: Route Details + FR1 detail view
// Owner: Saad

import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, Image,
  StyleSheet, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getRouteById } from '../services/routeApi';
import { addFavourite, removeFavourite, getFavourites } from '../services/userApi';

const DIFF = {
  Easy:     { bg: '#E8F5E9', fg: '#2E7D32' },
  Moderate: { bg: '#FFF3E0', fg: '#E65100' },
  Hard:     { bg: '#FFEBEE', fg: '#C62828' },
};

export default function RouteDetailsScreen({ route: navRoute, navigation }) {
  const { routeId } = navRoute.params;
  const insets = useSafeAreaInsets();
  const [route,   setRoute]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [saved,   setSaved]   = useState(false);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    getRouteById(routeId)
      .then(setRoute)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    getFavourites()
      .then((favs) => setSaved(favs.some((f) => f.id === routeId)))
      .catch(() => {});
  }, [routeId]);

  async function toggleFavourite() {
    if (saving) return;
    setSaving(true);
    try {
      if (saved) {
        await removeFavourite(routeId);
        setSaved(false);
      } else {
        await addFavourite(routeId);
        setSaved(true);
      }
    } catch {
      // silently ignore — network may be unavailable
    } finally {
      setSaving(false);
    }
  }

  if (loading) return (
    <View style={s.centered}>
      <ActivityIndicator size="large" color="#4A90E2" />
    </View>
  );

  if (error || !route) return (
    <View style={s.centered}>
      <Text style={s.errorText}>{error || 'Route not found.'}</Text>
      <TouchableOpacity style={s.btn} onPress={() => navigation.goBack()}>
        <Text style={s.btnText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );

  const diff = DIFF[route.difficulty] ?? DIFF.Easy;

  return (
    <ScrollView style={s.container}>
      <View>
        <Image source={{ uri: route.imageUrl }} style={s.hero} />
        <TouchableOpacity
          style={[s.backBtn, { top: insets.top + 8 }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.favBtn, { top: insets.top + 8 }]}
          onPress={toggleFavourite}
          disabled={saving}
        >
          <Ionicons
            name={saved ? 'heart' : 'heart-outline'}
            size={22}
            color={saved ? '#E94B3C' : '#fff'}
          />
        </TouchableOpacity>
      </View>
      <View style={s.body}>
        <Text style={s.name}>{route.name}</Text>

        <View style={s.badgeRow}>
          <View style={[s.badge, { backgroundColor: diff.bg }]}>
            <Text style={[s.badgeText, { color: diff.fg }]}>{route.difficulty}</Text>
          </View>
          {route.petFriendly && (
            <View style={[s.badge, { backgroundColor: '#E3F2FD' }]}>
              <Text style={[s.badgeText, { color: '#1976D2' }]}>Pet Friendly</Text>
            </View>
          )}
        </View>

        <View style={s.statsRow}>
          <Stat icon="navigate-outline"    label="Distance"  value={`${route.distance} km`} />
          <Stat icon="time-outline"        label="Time"      value={route.estimatedTime}    />
          <Stat icon="trending-up-outline" label="Elevation" value={`${route.elevation} m`} />
        </View>

        <View style={s.ratingRow}>
          <Ionicons name="star" size={15} color="#F5A623" />
          <Text style={s.rating}>{route.rating}</Text>
          <Text style={s.reviewCount}>({route.reviewCount} reviews)</Text>
        </View>

        <Text style={s.sectionTitle}>About</Text>
        <Text style={s.description}>{route.description}</Text>

        <Text style={s.sectionTitle}>Surface</Text>
        <Text style={s.meta}>{route.surface}</Text>
      </View>
    </ScrollView>
  );
}

function Stat({ icon, label, value }) {
  return (
    <View style={s.stat}>
      <Ionicons name={icon} size={18} color="#4A90E2" />
      <Text style={s.statLabel}>{label}</Text>
      <Text style={s.statValue}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#fff' },
  centered:    { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  errorText:   { fontSize: 15, color: '#E94B3C', textAlign: 'center', paddingHorizontal: 24, marginBottom: 16 },
  btn:         { backgroundColor: '#4A90E2', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  btnText:     { color: '#fff', fontSize: 15, fontWeight: '600' },
  hero:        { width: '100%', height: 280 },
  backBtn:     { position: 'absolute', left: 14, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.40)', alignItems: 'center', justifyContent: 'center' },
  favBtn:      { position: 'absolute', right: 14, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.40)', alignItems: 'center', justifyContent: 'center' },
  body:        { padding: 20 },
  name:        { fontSize: 22, fontWeight: 'bold', color: '#111', marginBottom: 12 },
  badgeRow:    { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  badge:       { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6 },
  badgeText:   { fontSize: 13, fontWeight: '600' },
  statsRow:    { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#f9f9f9', borderRadius: 12, padding: 14, marginBottom: 16 },
  stat:        { alignItems: 'center' },
  statLabel:   { fontSize: 11, color: '#999', marginTop: 3 },
  statValue:   { fontSize: 13, fontWeight: '600', color: '#333', marginTop: 2 },
  ratingRow:   { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  rating:      { fontSize: 15, fontWeight: '600', color: '#333', marginLeft: 4 },
  reviewCount: { fontSize: 13, color: '#999', marginLeft: 4 },
  sectionTitle:{ fontSize: 16, fontWeight: '600', color: '#111', marginBottom: 6 },
  description: { fontSize: 14, lineHeight: 22, color: '#555', marginBottom: 20 },
  meta:        { fontSize: 14, color: '#555', marginBottom: 20 },
});
