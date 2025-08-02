import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import useActivityStore from '../../store/activityStore';
import ActivityCard from './components/ActivityCard';
import PaginationControls from './components/PaginationControls';
import FilterControls from './components/FilterControls';
import { useAuthStore } from '../../store/authStore';

const ActivityScreen = ({ navigation, route }) => {
  const { user } = useAuthStore();
  const {
    activities,
    loading,
    error,
    pagination,
    filters,
    fetchActivitiesByProfessor,
    fetchAvailableActivitiesForStudent,
    setPage,
    setFilters,
    clearError
  } = useActivityStore();

  const [refreshing, setRefreshing] = useState(false);

  // Determinar el tipo de usuario y cargar actividades apropiadas
  const loadActivities = async (page = 1) => {
    try {
      if (user?.role === 'professor') {
        await fetchActivitiesByProfessor(user.id, page, 10, filters.section);
      } else {
        await fetchAvailableActivitiesForStudent(user.id, page, 10, filters.section);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [user]);

  useEffect(() => {
    if (filters.section !== null) {
      loadActivities(1);
    }
  }, [filters.section]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadActivities(pagination.currentPage);
    setRefreshing(false);
  };

  const handlePageChange = async (page) => {
    setPage(page);
    await loadActivities(page);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleActivityPress = (activity) => {
    navigation.navigate('ActivityDetail', { activityId: activity.id });
  };

  const renderActivityItem = ({ item }) => (
    <ActivityCard
      activity={item}
      onPress={() => handleActivityPress(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {loading ? 'Cargando actividades...' : 'No se encontraron actividades'}
      </Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => {
          clearError();
          loadActivities();
        }}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {user?.role === 'professor' ? 'Mis Actividades' : 'Actividades Disponibles'}
        </Text>
        <Text style={styles.subtitle}>
          Total: {pagination.totalItems} actividades
        </Text>
      </View>

      <FilterControls
        currentFilters={filters}
        onFilterChange={handleFilterChange}
      />

      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#007AFF']}
          />
        }
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={
          loading && activities.length > 0 ? (
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
          ) : null
        }
      />

      {pagination.totalPages > 1 && (
        <PaginationControls
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 10,
    paddingBottom: 100, // Espacio para controles de paginación
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
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
  loader: {
    marginVertical: 20,
  },
});

export default ActivityScreen; 