import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { profileStyles } from '@/styles/profile.styles';
import { useAuthStore } from '@/store/authStore';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  
  // Mock badges data - in real app this would come from API
  const badges = [
    { id: '1', name: 'Matemáticas', icon: '🥇', isUnlocked: true },
    { id: '2', name: 'Ciencias', icon: '🥈', isUnlocked: false },
    { id: '3', name: 'Historia', icon: '🥉', isUnlocked: true },
  ];

  if (!user) {
    return null; // Should not happen when authenticated
  }

  const maxExperience = 100;
  const experiencePercentage = (user.experience / maxExperience) * 100;

  return (
    <ScreenWrapper>
      <PokemonHeader title="Mi Perfil" coins={user.xaviCoins} />
      <ScrollView 
        style={profileStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={profileStyles.profileCard}>
          {/* Avatar and basic info */}
          <View style={profileStyles.avatarSection}>
            <View style={profileStyles.avatarContainer}>
              <Image source={{ uri: user.avatar }} style={profileStyles.avatar} />
            </View>
            <Text style={profileStyles.username}>{user.username}</Text>
            <Text style={profileStyles.level}>Nivel {user.level}</Text>
            
            {/* Progress bar */}
            <View style={profileStyles.progressContainer}>
              <View style={profileStyles.progressBar}>
                <View
                  style={[
                    profileStyles.progressFill,
                    { width: `${experiencePercentage}%` },
                  ]}
                />
              </View>
              <View style={profileStyles.progressText}>
                <Text style={profileStyles.progressLabel}>
                  {user.experience}/{maxExperience} XP
                </Text>
                <Text style={profileStyles.progressLabel}>Nivel {user.level + 1}</Text>
              </View>
            </View>
          </View>

          {/* Statistics */}
          <View style={profileStyles.statsSection}>
            <Text style={profileStyles.sectionTitle}>Estadísticas</Text>
            <View style={profileStyles.statsGrid}>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statLabel}>Actividades completadas</Text>
                <Text style={profileStyles.statValue}>{user.completedActivities}</Text>
              </View>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statLabel}>Total XaviCoins ganadas</Text>
                <Text style={profileStyles.statValue}>{user.totalXaviCoins}</Text>
              </View>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statLabel}>Racha actual</Text>
                <Text style={profileStyles.statValue}>{user.currentStreak} días</Text>
              </View>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statLabel}>Objetos comprados</Text>
                <Text style={profileStyles.statValue}>{user.purchasedItems}</Text>
              </View>
            </View>
          </View>

          {/* Badges */}
          <View style={profileStyles.badgesSection}>
            <Text style={profileStyles.sectionTitle}>Medallas</Text>
            <View style={profileStyles.badgesContainer}>
              {badges.map((badge) => (
                <View key={badge.id} style={profileStyles.badgeItem}>
                  <View
                    style={[
                      profileStyles.badgeIcon,
                      !badge.isUnlocked && profileStyles.badgeLocked,
                    ]}
                  >
                    <Text style={profileStyles.badgeText}>{badge.icon}</Text>
                  </View>
                  <Text style={profileStyles.badgeName}>{badge.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfilePage; 