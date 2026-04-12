// FR3: Favourites & Profile — Owner: Aksheen

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import RouteCard from '../components/RouteCard';
import { getFavourites, removeFavourite } from '../services/userApi';

export default function FavoritesScreen({ navigation }) {
  const [routes,  setRoutes]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useFocusEffect(useCallback(() => { load(); }, []));

  async function load() {
    try { setLoading(true); setError(null); setRoutes(await getFavourites()); }
    catch (e) { setError(e.message); }
    finally   { setLoading(false); }
  }

  async function handleRemove(routeId) {
    await removeFavourite(routeId).catch(() => {});
    setRoutes((prev) => prev.filter((r) => r.id !== routeId));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#4A90E2" />}
      {error   && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <View>
              <RouteCard
                route={item}
                onPress={() => navigation.navigate('Explore', { screen: 'RouteDetails', params: { routeId: item.id } })}
              />
              <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item.id)}>
                <Ionicons name="heart-dislike-outline" size={14} color="#E94B3C" />
                <Text style={styles.removeBtnText}>  Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.placeholder}>
              <Ionicons name="heart-outline" size={64} color="#E94B3C" />
              <Text style={styles.placeholderTitle}>No Favorites Yet</Text>
              <Text style={styles.placeholderSub}>Routes you favorite will appear here.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: '#F5F5F5' },
  header:          { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  title:           { fontSize: 22, fontWeight: '800', color: '#222' },
  error:           { color: '#E94B3C', textAlign: 'center', marginTop: 24, paddingHorizontal: 24 },
  removeBtn:       { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 12, marginBottom: 12, paddingVertical: 8, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#E94B3C' },
  removeBtnText:   { color: '#E94B3C', fontSize: 13, fontWeight: '600' },
  placeholder:     { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, marginTop: 80 },
  placeholderTitle:{ fontSize: 18, fontWeight: '700', color: '#555', marginTop: 16 },
  placeholderSub:  { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 8, lineHeight: 21 },
});