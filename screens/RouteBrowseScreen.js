// RouteBrowseScreen - Browse and search available routes
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RouteCard from '../components/RouteCard';
import { routes, filterOptions } from '../data/dummyData';

export default function RouteBrowseScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter routes based on search and active filter
  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      searchText === '' ||
      route.name.toLowerCase().includes(searchText.toLowerCase()) ||
      route.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesFilter =
      activeFilter === 'All' ||
      activeFilter === 'Nearby' ||
      activeFilter === 'Popular' ||
      route.difficulty === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length > 0) {
      setLoading(true);
      setTimeout(() => setLoading(false), 400);
    }
  };

  const renderHeader = () => (
    <View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search routes..."
          placeholderTextColor="#aaa"
          value={searchText}
          onChangeText={handleSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        {searchText.length > 0 && loading && (
          <ActivityIndicator size="small" color="#4A90E2" />
        )}
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.chip, activeFilter === filter && styles.activeChip]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.chipText, activeFilter === filter && styles.activeChipText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {filteredRoutes.length} route{filteredRoutes.length !== 1 ? 's' : ''} found
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search" size={48} color="#ddd" />
      <Text style={styles.emptyTitle}>No routes found</Text>
      <Text style={styles.emptySubtitle}>Try adjusting your search or filters</Text>
      <TouchableOpacity
        style={styles.clearBtn}
        onPress={() => { setSearchText(''); setActiveFilter('All'); }}
      >
        <Text style={styles.clearBtnText}>Clear Filters</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Explore Routes</Text>
          <Text style={styles.headerSubtitle}>Find your next adventure</Text>
        </View>
        <TouchableOpacity style={styles.filterIconBtn}>
          <Ionicons name="options-outline" size={22} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredRoutes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RouteCard
            route={item}
            onPress={() => navigation.navigate('RouteDetails', { routeId: item.id })}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A90E2']}
            tintColor="#4A90E2"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#222',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 1,
  },
  filterIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 4,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    padding: 0,
  },
  filterContainer: {
    marginTop: 8,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  activeChip: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  chipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  activeChipText: {
    color: '#fff',
    fontWeight: '600',
  },
  resultsCount: {
    fontSize: 13,
    color: '#888',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
    textAlign: 'center',
  },
  clearBtn: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 20,
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
