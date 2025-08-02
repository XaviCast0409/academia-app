import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import useActivityStore from '../../store/activityStore';

const { width, height } = Dimensions.get('window');

const ActivityDetailScreen = ({ navigation, route }) => {
  const { activityId } = route.params;
  const { currentActivity, loading, error, fetchActivityById } = useActivityStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (activityId) {
      fetchActivityById(activityId);
    }
  }, [activityId]);

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

  const handleImageChange = (direction) => {
    if (!currentActivity?.images || currentActivity.images.length <= 1) return;
    
    if (direction === 'next') {
      setCurrentImageIndex((prev) => 
        prev === currentActivity.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentActivity.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando actividad...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => fetchActivityById(activityId)}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentActivity) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró la actividad</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Imagen principal */}
      <View style={styles.imageContainer}>
        {currentActivity.images && currentActivity.images.length > 0 ? (
          <Image
            source={{ uri: currentActivity.images[currentImageIndex] }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>📚</Text>
          </View>
        )}

        {/* Controles de imagen si hay múltiples */}
        {currentActivity.images && currentActivity.images.length > 1 && (
          <View style={styles.imageControls}>
            <TouchableOpacity
              style={styles.imageControlButton}
              onPress={() => handleImageChange('prev')}
            >
              <Text style={styles.imageControlText}>‹</Text>
            </TouchableOpacity>
            <View style={styles.imageIndicator}>
              <Text style={styles.imageIndicatorText}>
                {currentImageIndex + 1} / {currentActivity.images.length}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.imageControlButton}
              onPress={() => handleImageChange('next')}
            >
              <Text style={styles.imageControlText}>›</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Badge de dificultad */}
        <View style={styles.difficultyBadge}>
          <View style={[
            styles.difficultyBadgeContent,
            { backgroundColor: getDifficultyColor(currentActivity.difficulty) }
          ]}>
            <Text style={styles.difficultyText}>
              {getDifficultyText(currentActivity.difficulty)}
            </Text>
          </View>
        </View>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.title}>{currentActivity.title}</Text>
        
        <View style={styles.metaInfo}>
          <View style={styles.xavicointsContainer}>
            <Text style={styles.xavicointsIcon}>⭐</Text>
            <Text style={styles.xavicointsText}>{currentActivity.xavicoints} Xavicoints</Text>
          </View>

          {currentActivity.section && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionText}>{currentActivity.section}</Text>
            </View>
          )}
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Descripción</Text>
          <Text style={styles.description}>{currentActivity.description}</Text>
        </View>

        {currentActivity.professor && (
          <View style={styles.professorContainer}>
            <Text style={styles.professorLabel}>Creado por:</Text>
            <Text style={styles.professorName}>{currentActivity.professor.name}</Text>
          </View>
        )}

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Fecha de creación:</Text>
          <Text style={styles.dateText}>
            {new Date(currentActivity.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            // Aquí puedes agregar la lógica para iniciar la actividad
            Alert.alert('Iniciar Actividad', '¿Deseas comenzar esta actividad?');
          }}
        >
          <Text style={styles.primaryButtonText}>Iniciar Actividad</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  mainImage: {
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
    fontSize: 60,
  },
  imageControls: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  imageControlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageControlText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  imageIndicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  difficultyBadgeContent: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    lineHeight: 30,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  xavicointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xavicointsIcon: {
    fontSize: 18,
    marginRight: 5,
  },
  xavicointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  sectionContainer: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  sectionText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  professorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  professorLabel: {
    fontSize: 14,
    color: '#999',
    marginRight: 5,
  },
  professorName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    padding: 20,
    paddingTop: 0,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ActivityDetailScreen; 