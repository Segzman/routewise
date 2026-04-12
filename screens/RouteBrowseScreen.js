// Route browse screen — FR1: Route Discovery
// Owner: Saad

import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, ScrollView, TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RouteCard from '../components/RouteCard';
import * as BrowseApi from '../services/browseApi';

const FILTER_OPTIONS = ['All', 'Easy', 'Moderate', 'Hard', 'Beginner Friendly', 'Dog Friendly'];

export default function RouteBrowseScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [routes,       setRoutes]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm,   setSearchTerm]   = useState('');

  useEffect(() => { load(); }, [activeFilter]);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      let data;
      if (activeFilter === 'All')                  data = await BrowseApi.getAllRoutes();
      else if (activeFilter === 'Beginner Friendly') data = await BrowseApi.getBeginnerFriendlyRoutes();
      else if (activeFilter === 'Dog Friendly')     data = await BrowseApi.getDogFriendlyRoutes();
      else                                          data = await BrowseApi.getRoutesByDifficulty(activeFilter);
      setRoutes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    if (!searchTerm.trim()) { load(); return; }
    try {
      setLoading(true);
      setError(null);
      setRoutes(await BrowseApi.searchRoutes(searchTerm));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <View style={s.centered}>
      <ActivityIndicator size="large" color="#4A90E2" />
    </View>
  );

  if (error) return (
    <View style={s.centered}>
      <Text style={s.errorText}>{error}</Text>
      <TouchableOpacity style={s.btn} onPress={load}>
        <Text style={s.btnText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      {/* Search bar */}
      <View style={s.searchRow}>
        <TextInput
          style={s.searchInput}
          placeholder="Search routes..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={s.searchBtn} onPress={handleSearch}>
          <Text style={s.searchBtnText}>Go</Text>
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterBar}>
        {FILTER_OPTIONS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[s.chip, activeFilter === f && s.chipActive]}
            onPress={() => { setSearchTerm(''); setActiveFilter(f); }}
          >
            <Text style={[s.chipText, activeFilter === f && s.chipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RouteCard
            route={item}
            onPress={() => navigation.navigate('RouteDetails', { routeId: item.id })}
          />
        )}
        contentContainerStyle={s.list}
        ListEmptyComponent={<Text style={s.empty}>No routes found.</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#f5f5f5' },
  centered:   { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  errorText:  { fontSize: 15, color: '#E94B3C', textAlign: 'center', paddingHorizontal: 24, marginBottom: 16 },
  btn:        { backgroundColor: '#4A90E2', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  btnText:    { color: '#fff', fontSize: 15, fontWeight: '600' },
  searchRow:  { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  searchInput:{ flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, marginRight: 8 },
  searchBtn:  { backgroundColor: '#4A90E2', paddingHorizontal: 16, borderRadius: 8, justifyContent: 'center' },
  searchBtnText: { color: '#fff', fontWeight: '600' },
  filterBar:  { maxHeight: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', paddingHorizontal: 12 },
  chip:       { paddingHorizontal: 16, paddingVertical: 8, marginRight: 8, borderRadius: 20, backgroundColor: '#f0f0f0', alignSelf: 'center' },
  chipActive: { backgroundColor: '#4A90E2' },
  chipText:   { fontSize: 13, color: '#555' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  list:       { padding: 12 },
  empty:      { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 15 },
});
