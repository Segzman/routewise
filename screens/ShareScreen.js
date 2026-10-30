// ShareScreen — submit a new route to the community (POST /api/routes)
// Owner: Sekun

import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { createRoute } from '../services/routeApi';

const DIFFICULTIES = ['Easy', 'Moderate', 'Hard'];

// "47.6, -122.3" -> { lat: 47.6, lng: -122.3 } | null
function parseCoords(text) {
  const parts = text.split(',').map((v) => parseFloat(v.trim()));
  if (parts.length !== 2 || parts.some((n) => !Number.isFinite(n))) return null;
  const [lat, lng] = parts;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng };
}

export default function ShareScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [name,        setName]        = useState('');
  const [difficulty,  setDifficulty]  = useState('');
  const [description, setDescription] = useState('');
  const [startPoint,  setStartPoint]  = useState('');
  const [endPoint,    setEndPoint]    = useState('');
  const [submitting,  setSubmitting]  = useState(false);
  const [error,       setError]       = useState(null);

  async function handleSubmit() {
    setError(null);

    if (!name.trim() || !difficulty.trim() || !description.trim()) {
      setError('Name, difficulty and description are required.');
      return;
    }
    const start = parseCoords(startPoint);
    const end   = parseCoords(endPoint);
    if (!start || !end) {
      setError('Coordinates must be valid "lat, lng" pairs (e.g. "47.6, -122.3").');
      return;
    }
    if (start.lat === end.lat && start.lng === end.lng) {
      setError('Start and end coordinates must be different.');
      return;
    }

    setSubmitting(true);
    try {
      const created = await createRoute({
        name:        name.trim(),
        difficulty:  difficulty.trim(),
        description: description.trim(),
        coordinates: [start, end],
      });
      Alert.alert('Route shared!', `"${created.name}" is now visible to everyone.`);
      setName(''); setDifficulty(''); setDescription(''); setStartPoint(''); setEndPoint('');
      navigation.navigate('RouteDetails', { routeId: created.id });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={s.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={s.container}
        contentContainerStyle={[s.content, { paddingTop: insets.top + 12 }]}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>

        <Text style={s.title}>Share a Route</Text>
        <Text style={s.subtitle}>
          Add a route the community can browse, map and hike.
        </Text>

        <Text style={s.label}>Route name</Text>
        <TextInput
          style={s.input}
          placeholder="e.g. Ridge Trail Loop"
          value={name}
          onChangeText={setName}
        />

        <Text style={s.label}>Difficulty</Text>
        <View style={s.chipRow}>
          {DIFFICULTIES.map((d) => (
            <TouchableOpacity
              key={d}
              style={[s.chip, difficulty === d && s.chipActive]}
              onPress={() => setDifficulty(d)}
            >
              <Text style={[s.chipText, difficulty === d && s.chipTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.label}>Description</Text>
        <TextInput
          style={[s.input, s.textarea]}
          placeholder="Trail conditions, scenery, tips..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={s.label}>Start point (lat, lng)</Text>
        <TextInput
          style={s.input}
          placeholder="47.6118, -122.3350"
          value={startPoint}
          onChangeText={setStartPoint}
          keyboardType="numbers-with-comma"
          autoCapitalize="none"
        />

        <Text style={s.label}>End point (lat, lng)</Text>
        <TextInput
          style={s.input}
          placeholder="47.6205, -122.3493"
          value={endPoint}
          onChangeText={setEndPoint}
          keyboardType="numbers-with-comma"
          autoCapitalize="none"
        />

        {error && <Text style={s.error}>{error}</Text>}

        <TouchableOpacity
          style={[s.submitBtn, submitting && s.submitDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting
            ? <ActivityIndicator color="#fff" />
            : <Text style={s.submitText}>Submit Route</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#f5f5f5' },
  content:      { padding: 20 },
  backBtn:      { position: 'absolute', left: 20, marginTop: 2, padding: 4, zIndex: 1 },
  title:        { fontSize: 24, fontWeight: '800', color: '#222', marginBottom: 4 },
  subtitle:     { fontSize: 14, color: '#666', marginBottom: 20 },
  label:        { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 6 },
  input:        { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 16 },
  textarea:     { height: 90, textAlignVertical: 'top', paddingTop: 10 },
  chipRow:      { flexDirection: 'row', gap: 8, marginBottom: 16 },
  chip:         { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd' },
  chipActive:   { backgroundColor: '#4A90E2', borderColor: '#4A90E2' },
  chipText:     { fontSize: 13, color: '#555', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  error:        { color: '#E94B3C', fontSize: 13, marginBottom: 12 },
  submitBtn:    { backgroundColor: '#50C878', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 8, marginBottom: 40 },
  submitDisabled: { opacity: 0.6 },
  submitText:   { color: '#fff', fontSize: 16, fontWeight: '700' },
});
