// OfflineDownloadModal - Download confirmation dialog
import React, { useState } from 'react';
import {
  View, Text, Modal, TouchableOpacity,
  StyleSheet, Switch, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OfflineDownloadModal({ visible, onClose, route }) {
  const [wifiOnly, setWifiOnly] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 2000);
  };

  const handleClose = () => {
    setDownloaded(false);
    setDownloading(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>

          {/* Handle bar */}
          <View style={styles.handle} />

          {/* Title */}
          <View style={styles.titleRow}>
            <Ionicons name="download-outline" size={22} color="#4A90E2" />
            <Text style={styles.title}>Download for Offline</Text>
          </View>

          {downloaded ? (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={48} color="#50C878" />
              <Text style={styles.successText}>Download Complete!</Text>
              <Text style={styles.successSub}>"{route?.name}" is now available offline.</Text>
              <TouchableOpacity style={styles.doneBtn} onPress={handleClose}>
                <Text style={styles.doneBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Route name */}
              <Text style={styles.routeName}>{route?.name}</Text>

              {/* Checklist */}
              <View style={styles.checklist}>
                {['Route map tiles', 'Elevation data', 'Trail markers', 'Warnings & info'].map((item) => (
                  <View key={item} style={styles.checkRow}>
                    <Ionicons name="checkmark-circle-outline" size={18} color="#50C878" />
                    <Text style={styles.checkText}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* Storage */}
              <View style={styles.storageRow}>
                <Ionicons name="server-outline" size={16} color="#888" />
                <Text style={styles.storageText}>Estimated size: ~45 MB</Text>
              </View>

              {/* WiFi toggle */}
              <View style={styles.toggleRow}>
                <View>
                  <Text style={styles.toggleLabel}>Download on WiFi only</Text>
                  <Text style={styles.toggleSub}>Recommended to avoid data charges</Text>
                </View>
                <Switch
                  value={wifiOnly}
                  onValueChange={setWifiOnly}
                  trackColor={{ false: '#ddd', true: '#4A90E2' }}
                  thumbColor="#fff"
                />
              </View>

              {/* Buttons */}
              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload} disabled={downloading}>
                  {downloading
                    ? <ActivityIndicator size="small" color="#fff" />
                    : <Text style={styles.downloadBtnText}>Download</Text>
                  }
                </TouchableOpacity>
              </View>
            </>
          )}

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  handle: { width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '700', color: '#222' },
  routeName: { fontSize: 15, color: '#555', marginBottom: 16 },
  checklist: { backgroundColor: '#F8F8F8', borderRadius: 12, padding: 14, marginBottom: 14, gap: 10 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkText: { fontSize: 14, color: '#444' },
  storageRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  storageText: { fontSize: 13, color: '#888' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8F8F8', borderRadius: 12, padding: 14, marginBottom: 20 },
  toggleLabel: { fontSize: 14, fontWeight: '600', color: '#333' },
  toggleSub: { fontSize: 12, color: '#888', marginTop: 2 },
  btnRow: { flexDirection: 'row', gap: 12 },
  cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: '#E0E0E0', alignItems: 'center' },
  cancelBtnText: { fontSize: 15, fontWeight: '600', color: '#666' },
  downloadBtn: { flex: 2, paddingVertical: 14, borderRadius: 12, backgroundColor: '#4A90E2', alignItems: 'center' },
  downloadBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  successBox: { alignItems: 'center', paddingVertical: 20, gap: 10 },
  successText: { fontSize: 18, fontWeight: '700', color: '#222' },
  successSub: { fontSize: 14, color: '#888', textAlign: 'center' },
  doneBtn: { marginTop: 10, paddingHorizontal: 40, paddingVertical: 12, backgroundColor: '#4A90E2', borderRadius: 12 },
  doneBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});