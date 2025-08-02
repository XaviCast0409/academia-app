import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { activitiesStyles } from '@/styles/activities.styles';
import { useAuthStore } from '@/store/authStore';

const ActivitiesPage: React.FC = () => {
  const { user } = useAuthStore();
  
  // Mock data for activities
  const activities = [
    {
      id: '1',
      title: 'Matemáticas Básicas',
      description: 'Resuelve problemas de suma y resta',
      reward: 50,
      difficulty: 'Fácil',
      category: 'Matemáticas',
      isCompleted: false,
      icon: '🔢',
    },
    {
      id: '2',
      title: 'Ciencias Naturales',
      description: 'Aprende sobre los ecosistemas',
      reward: 75,
      difficulty: 'Medio',
      category: 'Ciencias',
      isCompleted: true,
      icon: '🌿',
    },
    {
      id: '3',
      title: 'Historia Mundial',
      description: 'Descubre civilizaciones antiguas',
      reward: 100,
      difficulty: 'Difícil',
      category: 'Historia',
      isCompleted: false,
      icon: '🏛️',
    },
    {
      id: '4',
      title: 'Geografía',
      description: 'Explora países y capitales',
      reward: 80,
      difficulty: 'Medio',
      category: 'Geografía',
      isCompleted: false,
      icon: '🌍',
    },
    {
      id: '5',
      title: 'Lenguaje',
      description: 'Mejora tu vocabulario',
      reward: 60,
      difficulty: 'Fácil',
      category: 'Lenguaje',
      isCompleted: true,
      icon: '📚',
    },
    {
      id: '6',
      title: 'Arte',
      description: 'Descubre artistas famosos',
      reward: 90,
      difficulty: 'Medio',
      category: 'Arte',
      isCompleted: false,
      icon: '🎨',
    },
    {
      id: '7',
      title: 'Música',
      description: 'Aprende sobre instrumentos',
      reward: 70,
      difficulty: 'Fácil',
      category: 'Música',
      isCompleted: false,
      icon: '🎵',
    },
    {
      id: '8',
      title: 'Deportes',
      description: 'Conoce diferentes deportes',
      reward: 85,
      difficulty: 'Medio',
      category: 'Deportes',
      isCompleted: false,
      icon: '⚽',
    },
  ];

  return (
    <ScreenWrapper>
      <PokemonHeader title="Actividades" coins={user?.xaviCoins || 0} />
      <ScrollView 
        style={activitiesStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={activitiesStyles.activitiesContainer}>
          {activities.map((activity) => (
            <TouchableOpacity key={activity.id} style={activitiesStyles.activityCard}>
              <View style={activitiesStyles.activityHeader}>
                <Text style={activitiesStyles.activityIcon}>{activity.icon}</Text>
                <View style={activitiesStyles.activityInfo}>
                  <Text style={activitiesStyles.activityTitle}>{activity.title}</Text>
                  <Text style={activitiesStyles.activityDescription}>
                    {activity.description}
                  </Text>
                  <View style={activitiesStyles.activityMeta}>
                    <Text style={activitiesStyles.difficulty}>{activity.difficulty}</Text>
                    <Text style={activitiesStyles.category}>{activity.category}</Text>
                  </View>
                </View>
              </View>
              <View style={activitiesStyles.activityFooter}>
                <View style={activitiesStyles.rewardContainer}>
                  <Text style={activitiesStyles.rewardText}>{activity.reward} XaviCoins</Text>
                </View>
                <TouchableOpacity
                  style={[
                    activitiesStyles.actionButton,
                    activity.isCompleted && activitiesStyles.completedButton,
                  ]}
                >
                  <Text
                    style={[
                      activitiesStyles.actionButtonText,
                      activity.isCompleted && activitiesStyles.completedButtonText,
                    ]}
                  >
                    {activity.isCompleted ? 'Completado' : 'Comenzar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ActivitiesPage; 