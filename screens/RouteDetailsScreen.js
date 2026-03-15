// RouteDetailsScreen - Comprehensive view of a single route (most important screen)
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OfflineDownloadModal from '../components/OfflineDownloadModal';
import { routes } from '../data/dummyData';

const DIFFICULTY_COLORS = {
  Easy: '#50C878',
  Moderate: '#F39C12',
  Hard: '#E94B3C',
};

export default function RouteDetailsScreen({ route: navRoute, navigation }) {
  const { routeId } = navRoute.params;
  const route = routes.find((r) => r.id === routeId) || routes[0];

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [warningsExpanded, setWarningsExpanded] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(true);

  const difficultyColor = DIFFICULTY_COLORS[route.difficulty] || '#888';

  const handleAddFavorite = () => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      isFavorite ? 'Removed' : 'Added!',
      isFavorite ? 'Removed from favorites.' : `"${route.name}" added to favorites!`
    );
  };

  const handleStartNavigation = () => {
    Alert.alert('Navigation Coming Soon', 'Turn-by-turn navigation will be available in the next update!');
  };

  const renderStarRating = (rating, size = 16) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= Math.floor(rating) ? 'star' : i - rating < 1 ? 'star-half' : 'star-outline'}
          size={size}
          color="#F39C12"
        />
      );
    }
    return <View style={{ flexDirection: 'row', gap: 1 }}>{stars}</View>;
  };

  const renderRatingBar = (stars, percent) => (
    <View style={styles.ratingBarRow} key={stars}>
      <Text style={styles.ratingBarLabel}>{stars}★</Text>
      <View style={styles.ratingBarTrack}>
        <View style={[styles.ratingBarFill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.ratingBarPercent}>{percent}%</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{route.name}</Text>
        <TouchableOpacity style={styles.menuBtn}>
          <Ionicons name="ellipsis-vertical" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image */}
        <Image source={{ uri: route.imageUrl }} style={styles.heroImage} resizeMode="cover" />

        <View style={styles.content}>
          {/* Route Name + Difficulty */}
          <View style={styles.titleRow}>
            <Text style={styles.routeTitle}>{route.name}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}>
              <Text style={styles.difficultyText}>{route.difficulty}</Text>
            </View>
          </View>

          {/* Quick Stats Bar */}
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <Ionicons name="navigate-outline" size={18} color="#4A90E2" />
              <Text style={styles.statValue}>{route.distance}</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="trending-up-outline" size={18} color="#50C878" />
              <Text style={styles.statValue}>{route.elevationGain}</Text>
              <Text style={styles.statLabel}>Elevation</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={18} color="#F39C12" />
              <Text style={styles.statValue}>{route.estimatedTime}</Text>
              <Text style={styles.statLabel}>Est. Time</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="star" size={18} color="#F39C12" />
              <Text style={styles.statValue}>{route.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>

          {/* Map Section (Collapsible) */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.sectionHeader}
              onPress={() => setMapExpanded(!mapExpanded)}
            >
              <View style={styles.sectionTitleRow}>
                <Ionicons name="map-outline" size={18} color="#4A90E2" />
                <Text style={styles.sectionTitle}>Route Map</Text>
              </View>
              <Ionicons name={mapExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#888" />
            </TouchableOpacity>

            {mapExpanded && (
              <View style={styles.mapContainer}>
                <Image
                  source={{ uri: `https://via.placeholder.com/400x200/E8F0FE/4A90E2?text=Route+Map+Preview` }}
                  style={styles.mapImage}
                  resizeMode="cover"
                />
                {/* Waypoint markers overlay */}
                <View style={styles.mapOverlay}>
                  <Text style={styles.mapOverlayText}>
                    {route.waypoints.length} waypoints along this route
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.fullMapBtn}
                  onPress={() => navigation.navigate('RouteMap', { routeId: route.id })}
                >
                  <Ionicons name="expand-outline" size={16} color="#fff" />
                  <Text style={styles.fullMapBtnText}>View Full Map</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Route Information */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="information-circle-outline" size={18} color="#4A90E2" />
              <Text style={styles.sectionTitle}>Route Information</Text>
            </View>
            <Text style={styles.description}>{route.description}</Text>
            <View style={styles.infoChips}>
              <View style={styles.infoChip}>
                <Ionicons name="layers-outline" size={14} color="#4A90E2" />
                <Text style={styles.infoChipText}>{route.surface}</Text>
              </View>
              {route.petFriendly && (
                <View style={styles.infoChip}>
                  <Ionicons name="paw-outline" size={14} color="#50C878" />
                  <Text style={[styles.infoChipText, { color: '#50C878' }]}>Pet Friendly</Text>
                </View>
              )}
              <View style={styles.infoChip}>
                <Ionicons name="footsteps-outline" size={14} color="#F39C12" />
                <Text style={styles.infoChipText}>{route.waypoints.length} Waypoints</Text>
              </View>
            </View>
          </View>

          {/* Photos & Landmarks */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleRow}>
                <Ionicons name="images-outline" size={18} color="#4A90E2" />
                <Text style={styles.sectionTitle}>Photos & Landmarks</Text>
              </View>
              <Text style={styles.photoCount}>{route.photos.length * 3} Photos</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
              {route.photos.map((photo, index) => (
                <TouchableOpacity key={index} style={styles.photoWrapper}>
                  <Image source={{ uri: photo }} style={styles.photoThumb} />
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.viewAllPhotos}>
                <Ionicons name="add" size={24} color="#4A90E2" />
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Safety & Warnings (Expandable) */}
          {route.warnings.length > 0 && (
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setWarningsExpanded(!warningsExpanded)}
              >
                <View style={styles.sectionTitleRow}>
                  <Ionicons name="warning-outline" size={18} color="#E94B3C" />
                  <Text style={[styles.sectionTitle, { color: '#E94B3C' }]}>
                    Safety & Warnings
                  </Text>
                  <View style={styles.warningBadge}>
                    <Text style={styles.warningBadgeText}>{route.warnings.length}</Text>
                  </View>
                </View>
                <Ionicons name={warningsExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#888" />
              </TouchableOpacity>

              {warningsExpanded && (
                <View style={styles.warningsList}>
                  {route.warnings.map((warning) => (
                    <View key={warning.id} style={styles.warningItem}>
                      <Ionicons name="alert-circle" size={16} color="#E94B3C" />
                      <View style={styles.warningContent}>
                        <Text style={styles.warningText}>{warning.text}</Text>
                        <Text style={styles.warningDate}>Updated {warning.date}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Reviews & Ratings */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="star-outline" size={18} color="#4A90E2" />
              <Text style={styles.sectionTitle}>Reviews & Ratings</Text>
            </View>

            <View style={styles.ratingsContainer}>
              {/* Big Rating */}
              <View style={styles.ratingOverall}>
                <Text style={styles.ratingBig}>{route.rating}</Text>
                {renderStarRating(route.rating, 20)}
                <Text style={styles.ratingReviewCount}>{route.reviewCount} reviews</Text>
              </View>

              {/* Rating Bars */}
              <View style={styles.ratingBars}>
                {[5, 4, 3, 2, 1].map((stars) =>
                  renderRatingBar(stars, route.ratingDistribution[stars] || 0)
                )}
              </View>
            </View>

            <TouchableOpacity style={styles.seeAllReviews}>
              <Text style={styles.seeAllText}>See all {route.reviewCount} reviews</Text>
              <Ionicons name="chevron-forward" size={16} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          {/* Bottom spacer for sticky buttons */}
          <View style={{ height: 90 }} />
        </View>
      </ScrollView>

      {/* Sticky Action Buttons */}
      <View style={styles.stickyActions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setShowDownloadModal(true)}
        >
          <Ionicons name="download-outline" size={18} color="#4A90E2" />
          <Text style={styles.actionBtnText}>Offline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, isFavorite && styles.favoriteActive]}
          onPress={handleAddFavorite}
        >
          <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={18} color={isFavorite ? '#fff' : '#F39C12'} />
          <Text style={[styles.actionBtnText, isFavorite && { color: '#fff' }]}>
            {isFavorite ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startNavBtn} onPress={handleStartNavigation}>
          <Ionicons name="navigate" size={20} color="#fff" />
          <Text style={styles.startNavText}>Start Navigation</Text>
        </TouchableOpacity>
      </View>

      {/* Offline Download Modal */}
      <OfflineDownloadModal
        visible={showDownloadModal}
        route={route}
        onClose={() => setShowDownloadModal(false)}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  menuBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  routeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#222',
    flex: 1,
    marginRight: 10,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  difficultyText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '700',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
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
    gap: 3,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  statLabel: {
    fontSize: 11,
    color: '#888',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 4,
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: 180,
  },
  mapOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  mapOverlayText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  fullMapBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 6,
  },
  fullMapBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 12,
  },
  infoChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  infoChipText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '500',
  },
  photoCount: {
    fontSize: 13,
    color: '#888',
  },
  photosScroll: {
    marginTop: 4,
  },
  photoWrapper: {
    marginRight: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  photoThumb: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  viewAllPhotos: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllText: {
    fontSize: 11,
    color: '#4A90E2',
    marginTop: 2,
  },
  warningBadge: {
    backgroundColor: '#E94B3C',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginLeft: 4,
  },
  warningBadgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '700',
  },
  warningsList: {
    marginTop: 8,
    gap: 10,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFF5F5',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#E94B3C',
  },
  warningContent: {
    flex: 1,
  },
  warningText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  warningDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  ratingsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 4,
    marginBottom: 12,
  },
  ratingOverall: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  ratingBig: {
    fontSize: 40,
    fontWeight: '800',
    color: '#333',
    lineHeight: 44,
  },
  ratingReviewCount: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  ratingBars: {
    flex: 1,
    gap: 5,
    justifyContent: 'center',
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBarLabel: {
    fontSize: 12,
    color: '#888',
    width: 20,
  },
  ratingBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  ratingBarFill: {
    height: 6,
    backgroundColor: '#F39C12',
    borderRadius: 3,
  },
  ratingBarPercent: {
    fontSize: 11,
    color: '#aaa',
    width: 30,
    textAlign: 'right',
  },
  seeAllReviews: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
  stickyActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    gap: 5,
  },
  actionBtnText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '600',
  },
  favoriteActive: {
    backgroundColor: '#F39C12',
    borderColor: '#F39C12',
  },
  startNavBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  startNavText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '700',
  },
});
