import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const ActivityCard = ({ activity, onPress }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      case 'expert':
        return '#9C27B0';
      default:
        return '#4CAF50';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'Principiante';
      case 'intermediate':
        return 'Intermedio';
      case 'advanced':
        return 'Avanzado';
      case 'expert':
        return 'Experto';
      default:
        return 'Principiante';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        {activity.images && activity.images.length > 0 ? (
          <Image
            source={{ uri: activity.images[0] }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>📚</Text>
          </View>
        )}
        <View style={styles.badgeContainer}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(activity.difficulty) }]}>
            <Text style={styles.difficultyText}>
              {getDifficultyText(activity.difficulty)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {activity.title}
        </Text>
        
        <Text style={styles.description} numberOfLines={3}>
          {activity.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.xavicointsContainer}>
            <Text style={styles.xavicointsIcon}>⭐</Text>
            <Text style={styles.xavicointsText}>{activity.xavicoints}</Text>
          </View>

          {activity.section && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>{activity.section}</Text>
            </View>
          )}
        </View>

        {activity.professor && (
          <View style={styles.professorContainer}>
            <Text style={styles.professorLabel}>Profesor:</Text>
            <Text style={styles.professorName}>{activity.professor.name}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  xavicointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xavicointsIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  xavicointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  sectionContainer: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  professorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  professorLabel: {
    fontSize: 12,
    color: '#999',
    marginRight: 4,
  },
  professorName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});

export default ActivityCard; 