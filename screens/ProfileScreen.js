import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { icon: 'person-outline', label: 'Edit Profile', color: '#4A90E2' },
  { icon: 'notifications-outline', label: 'Notifications', color: '#F39C12' },
  { icon: 'shield-outline', label: 'Privacy & Security', color: '#50C878' },
  { icon: 'help-circle-outline', label: 'Help & Support', color: '#9B59B6' },
  { icon: 'information-circle-outline', label: 'About', color: '#888' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={44} color="#fff" />
        </View>
        <Text style={styles.name}>Trail Explorer</Text>
        <Text style={styles.email}>explorer@routeapp.com</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statNum}>12</Text><Text style={styles.statLabel}>Hikes</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.stat}><Text style={styles.statNum}>5</Text><Text style={styles.statLabel}>Favorites</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.stat}><Text style={styles.statNum}>3</Text><Text style={styles.statLabel}>Downloads</Text></View>
        </View>
      </View>
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuRow}>
            <View style={[styles.menuIcon, { backgroundColor: item.color + '22' }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={16} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  title: { fontSize: 22, fontWeight: '800', color: '#222' },
  avatarSection: { backgroundColor: '#fff', alignItems: 'center', paddingVertical: 24, marginBottom: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#4A90E2', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  name: { fontSize: 20, fontWeight: '700', color: '#222' },
  email: { fontSize: 14, color: '#888', marginTop: 2 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0', width: '80%', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800', color: '#222' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: '#E0E0E0' },
  menu: { backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 16, overflow: 'hidden' },
  menuRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', gap: 12 },
  menuIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 15, color: '#333', fontWeight: '500' },
});