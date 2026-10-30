// Interactive route map (native) — polyline + start/end markers from route coordinates
// Owner: Sekun

import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function RouteMap({ coordinates }) {
  const mapRef  = useRef(null);
  const points  = (coordinates || []).map((p) => ({ latitude: p.lat, longitude: p.lng }));

  useEffect(() => {
    if (points.length < 2 || !mapRef.current) return;
    mapRef.current.fitToCoordinates(points, {
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
      animated: false,
    });
    // points follow the route payload — refit when a new route loads
  }, [coordinates]);

  return (
    <MapView
      ref={mapRef}
      style={s.map}
      initialRegion={{ latitude: points[0].latitude, longitude: points[0].longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
    >
      <Polyline
        coordinates={points}
        strokeWidth={4}
        strokeColor="#4A90E2"
        lineDashPattern={[1]}
      />
      <Marker coordinate={points[0]} title="Start" pinColor="#50C878" />
      <Marker coordinate={points[points.length - 1]} title="End" pinColor="#E94B3C" />
    </MapView>
  );
}

const s = StyleSheet.create({
  map: { width: '100%', height: 220, borderRadius: 12 },
});
