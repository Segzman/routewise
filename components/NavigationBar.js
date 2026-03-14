// NavigationBar - Bottom tab navigation bar component
// This is used as a standalone component where needed; the main tabs are in App.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TABS = [
  { key: 'Home', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { key: 'Explore', label: 'Explore', icon: 'map-outline', activeIcon: 'map' },
  { key: 'Share', label: 'Share', icon: 'cloud-upload-outline', activeIcon: 'cloud-upload' },
  { key: 'Profile', label: 'Profile', icon: 'person-outline', activeIcon: 'person' },
];

export default function NavigationBar({ activeTab, onTabPress }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? '#4A90E2' : '#aaa'}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 8,
    paddingTop: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 4,
    position: 'relative',
  },
  label: {
    fontSize: 11,
    color: '#aaa',
    marginTop: 2,
  },
  activeLabel: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    top: -6,
    width: 20,
    height: 3,
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
});
