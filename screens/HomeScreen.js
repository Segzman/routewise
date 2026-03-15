import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Image, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { featuredRoutes, categories } from '../data/dummyData';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.subtitle}>Where are you hiking today?</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={36} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Search Bar shortcut */}
        <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Browse')} activeOpacity={0.8}>
          <Ionicons name="search-outline" size={18} color="#aaa" />
          <Text style={styles.searchPlaceholder}>Search routes, trails...</Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse by Difficulty</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesRow}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryChip, { borderColor: cat.color }]} onPress={() => navigation.navigate('Browse')}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color + '22' }]}>
                <Ionicons name={cat.icon} size={20} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: cat.color }]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Routes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Routes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Browse')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredRoutes}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.featuredCard} onPress={() => navigation.navigate('RouteDetails', { routeId: item.id })} activeOpacity={0.85}>
              <Image source={{ uri: item.imageUrl }} style={styles.featuredImage} />
              <View style={styles.featuredOverlay}>
                <View style={[styles.difficultyBadge, { backgroundColor: item.difficulty === 'Easy' ? '#50C878' : item.difficulty === 'Hard' ? '#E94B3C' : '#F39C12' }]}>
                  <Text style={styles.difficultyText}>{item.difficulty}</Text>
                </View>
              </View>
              <View style={styles.featuredBody}>
                <Text style={styles.featuredName} numberOfLines={1}>{item.name}</Text>
                <View style={styles.featuredStats}>
                  <Ionicons name="navigate-outline" size={12} color="#888" />
                  <Text style={styles.featuredStatText}>{item.distance}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Ionicons name="star" size={12} color="#F39C12" />
                  <Text style={styles.featuredStatText}>{item.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionsGrid}>
          {[
            { label: 'Explore Routes', icon: 'map-outline', color: '#4A90E2', bg: '#EBF4FF', screen: 'Browse' },
            { label: 'My Favorites', icon: 'heart-outline', color: '#E94B3C', bg: '#FFF0F0', screen: 'Favorites' },
            { label: 'Offline Maps', icon: 'download-outline', color: '#50C878', bg: '#F0FFF4', screen: 'Downloads' },
            { label: 'My Profile', icon: 'person-outline', color: '#F39C12', bg: '#FFF8E6', screen: 'Profile' },
          ].map((action) => (
            <TouchableOpacity key={action.label} style={styles.actionCard} onPress={() => navigation.navigate(action.screen)}>
              <View style={[styles.actionIcon, { backgroundColor: action.bg }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, backgroundColor: '#fff' },
  greeting: { fontSize: 22, fontWeight: '800', color: '#222' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 2 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginTop: 14, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 2, gap: 8 },
  searchPlaceholder: { fontSize: 14, color: '#aaa' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 22, marginBottom: 10 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#222' },
  seeAll: { fontSize: 13, color: '#4A90E2', fontWeight: '600' },
  categoriesRow: { paddingHorizontal: 16, gap: 10 },
  categoryChip: { alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1.5, gap: 6, elevation: 1 },
  categoryIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  categoryLabel: { fontSize: 12, fontWeight: '600' },
  featuredList: { paddingHorizontal: 16, gap: 12 },
  featuredCard: { width: 200, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', elevation: 3 },
  featuredImage: { width: '100%', height: 130 },
  featuredOverlay: { position: 'absolute', top: 8, right: 8 },
  difficultyBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  difficultyText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  featuredBody: { padding: 10 },
  featuredName: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 4 },
  featuredStats: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  featuredStatText: { fontSize: 12, color: '#666' },
  dot: { color: '#ccc' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
  actionCard: { width: '46%', backgroundColor: '#fff', borderRadius: 14, padding: 16, alignItems: 'center', gap: 10, elevation: 2 },
  actionIcon: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 13, fontWeight: '600', color: '#333', textAlign: 'center' },
});