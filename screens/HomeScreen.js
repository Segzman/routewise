// HomeScreen - Main landing page with two functional area cards
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}>
            <Ionicons name="navigate" size={22} color="#fff" />
          </View>
          <Text style={styles.appTitle}>RouteWise</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person-circle-outline" size={32} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Discover & Share{'\n'}Community Routes</Text>
        <Text style={styles.heroSubtitle}>
          Explore trails, share adventures, and connect with fellow hikers.
        </Text>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1,240</Text>
          <Text style={styles.statLabel}>Routes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8,500</Text>
          <Text style={styles.statLabel}>Users</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>42k</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* Main Action Cards */}
      <View style={styles.cardsContainer}>
        {/* Explore Routes Card */}
        <TouchableOpacity
          style={[styles.actionCard, styles.exploreCard]}
          onPress={() => navigation.navigate('RouteBrowse')}
          activeOpacity={0.9}
        >
          <View style={styles.cardIconWrapper}>
            <Ionicons name="map" size={36} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Explore Routes</Text>
          <Text style={styles.cardDescription}>
            Browse community trails, filter by difficulty, and find your next adventure.
          </Text>
          <View style={styles.cardArrow}>
            <Text style={styles.cardArrowText}>Browse now</Text>
            <Ionicons name="arrow-forward" size={16} color="#4A90E2" />
          </View>
        </TouchableOpacity>

        {/* Share a Route Card */}
        <TouchableOpacity
          style={[styles.actionCard, styles.shareCard]}
          onPress={() => navigation.navigate('UploadRoute')}
          activeOpacity={0.9}
        >
          <View style={[styles.cardIconWrapper, styles.shareIconWrapper]}>
            <Ionicons name="cloud-upload" size={36} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Share a Route</Text>
          <Text style={styles.cardDescription}>
            Upload your GPS tracks, add photos, and share with the community.
          </Text>
          <View style={styles.cardArrow}>
            <Text style={[styles.cardArrowText, { color: '#50C878' }]}>Upload now</Text>
            <Ionicons name="arrow-forward" size={16} color="#50C878" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Trending This Week</Text>
        <TouchableOpacity
          style={styles.trendingItem}
          onPress={() => navigation.navigate('RouteBrowse')}
        >
          <View style={styles.trendingIcon}>
            <Ionicons name="trending-up" size={18} color="#E94B3C" />
          </View>
          <View style={styles.trendingInfo}>
            <Text style={styles.trendingName}>Mountain Peak Loop</Text>
            <Text style={styles.trendingMeta}>8.1 km • Hard • ⭐ 4.8</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trendingItem}
          onPress={() => navigation.navigate('RouteBrowse')}
        >
          <View style={[styles.trendingIcon, { backgroundColor: '#EBF9F1' }]}>
            <Ionicons name="flame" size={18} color="#50C878" />
          </View>
          <View style={styles.trendingInfo}>
            <Text style={styles.trendingName}>Lakeshore Trail</Text>
            <Text style={styles.trendingMeta}>5.2 km • Easy • ⭐ 4.5</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </TouchableOpacity>
      </View>
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
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    letterSpacing: -0.5,
  },
  profileBtn: {
    padding: 2,
  },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222',
    lineHeight: 36,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4A90E2',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  exploreCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  shareCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#50C878',
  },
  cardIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  shareIconWrapper: {
    backgroundColor: '#50C878',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 14,
  },
  cardArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardArrowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A90E2',
  },
  recentSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    gap: 12,
  },
  trendingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFF0EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendingInfo: {
    flex: 1,
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  trendingMeta: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});
