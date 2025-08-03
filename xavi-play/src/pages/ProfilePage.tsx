import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { profileStyles } from '@/styles/profile.styles';
import { useAuthStore } from '@/store/authStore';
import { useFocusRefresh } from '@/hooks/useFocusRefresh';
import { useUserStateListener } from '@/hooks/useUserStateListener';
import { 
  getExperienceProgress, 
  getExperienceForNextLevel, 
  getExperienceInCurrentLevel,
  getExperienceRemaining,
  getExperienceForCurrentLevel
} from '@/utils/experience';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  
  // Refrescar datos cuando el usuario navega al perfil
  useFocusRefresh();
  
  // Escuchar cambios en el estado del usuario para actualizar la vista
  const { user: currentUser, forceUpdate } = useUserStateListener();
  
  // Mock badges data - in real app this would come from API
  const badges = [
    { id: '1', name: 'Matemáticas', icon: '🥇', isUnlocked: true },
    { id: '2', name: 'Ciencias', icon: '🥈', isUnlocked: false },
    { id: '3', name: 'Historia', icon: '🥉', isUnlocked: true },
  ];

  if (!user) {
    return null; // Should not happen when authenticated
  }

  // Usar el usuario actual que puede haber sido actualizado
  const displayUser = currentUser || user;

  // Calcular progreso de experiencia usando las utilidades
  // forceUpdate se usa para forzar el recálculo cuando cambia el estado
  const experienceProgress = getExperienceProgress(displayUser.level, displayUser.experience);
  const experienceForNextLevel = getExperienceForNextLevel(displayUser.level);
  const experienceInCurrentLevel = getExperienceInCurrentLevel(displayUser.level, displayUser.experience);
  const experienceRemaining = getExperienceRemaining(displayUser.level, displayUser.experience);
  const experienceForCurrentLevel = getExperienceForCurrentLevel(displayUser.level);
  const experienceNeededForNextLevel = experienceForNextLevel - experienceForCurrentLevel;

  return (
    <ScreenWrapper>
      <PokemonHeader title="Mi Perfil" />
      <ScrollView 
        style={profileStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={profileStyles.profileCard}>
          {/* Avatar and basic info */}
          <View style={profileStyles.avatarSection}>
            <View style={profileStyles.avatarContainer}>
              <Image source={{ uri: displayUser.avatar }} style={profileStyles.avatar} />
            </View>
            <Text style={profileStyles.username}>{displayUser.username}</Text>
            <Text style={profileStyles.level}>Nivel {displayUser.level}</Text>
            
            {/* Progress bar */}
            <View style={profileStyles.progressContainer}>
              <View style={profileStyles.progressBar}>
                <View
                  style={[
                    profileStyles.progressFill,
                    { width: `${experienceProgress}%` },
                  ]}
                />
              </View>
              <View style={profileStyles.progressText}>
                <Text style={profileStyles.progressLabel}>
                  {experienceInCurrentLevel} XP / {experienceNeededForNextLevel} XP
                </Text>
                <Text style={profileStyles.progressLabel}>
                  Nivel {user.level + 1} ({experienceRemaining} XP restantes)
                </Text>
              </View>
            </View>
          </View>

          {/* Statistics */}
          <View style={profileStyles.statsSection}>
            <Text style={profileStyles.sectionTitle}>Estadísticas</Text>
            <View style={profileStyles.statsGrid}>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statLabel}>Actividades completadas</Text>
                <Text style={profileStyles.statValue}>{displayUser.completedActivities}</Text>
              </View>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statLabel}>Total XaviCoins ganadas</Text>
                <Text style={profileStyles.statValue}>{displayUser.totalXaviCoins}</Text>
              </View>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statLabel}>Racha actual</Text>
                <Text style={profileStyles.statValue}>{displayUser.currentStreak} días</Text>
              </View>
              <View style={profileStyles.statCard}>
                <Text style={profileStyles.statLabel}>Objetos comprados</Text>
                <Text style={profileStyles.statValue}>{displayUser.purchasedItems}</Text>
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