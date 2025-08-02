import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAuthStore } from '../../../store/authStore';

export default function ProfileCard() {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileBg}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: user.pokemon?.highResImageUrl }} style={styles.avatar} />
        </View>
        <Text style={styles.trainerName}>{user.name}</Text>
        <Text style={styles.trainerRole}>{user.role?.name}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Nivel</Text>
            <Text style={styles.statValue}>{user.level}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Pokémon</Text>
            <Text style={styles.statValue}>{user.pokemon?.name}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Xavicoints</Text>
            <Text style={styles.statValue}>{user.xavicoints}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileBg: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 32,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#2a75bb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    minWidth: 280,
    maxWidth: 340,
  },
  avatarWrapper: {
    backgroundColor: '#f5e663',
    borderRadius: 100,
    padding: 6,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#ffcb05',
    elevation: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff',
  },
  trainerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b4cca',
    fontFamily: 'monospace',
    marginTop: 6,
    marginBottom: 2,
    textAlign: 'center',
  },
  trainerRole: {
    fontSize: 16,
    color: '#e3350d',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 10,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'monospace',
  },
  statValue: {
    fontSize: 18,
    color: '#3b4cca',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginTop: 2,
  },
});
