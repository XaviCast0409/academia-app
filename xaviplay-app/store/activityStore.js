import { create } from 'zustand';
import { 
  getActivitiesByProfessor, 
  getAvailableActivitiesForStudent,
  getActivityById,
  getAllActivities 
} from '../services/activityService';

const useActivityStore = create((set, get) => ({
  // Estado
  activities: [],
  currentActivity: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    pageSize: 10,
    hasNextPage: false,
    hasPrevPage: false
  },
  filters: {
    section: null,
    difficulty: null
  },

  // Acciones
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // Obtener actividades por profesor
  fetchActivitiesByProfessor: async (professorId, page = 1, pageSize = 10, section = null) => {
    try {
      set({ loading: true, error: null });
      const response = await getActivitiesByProfessor(professorId, page, pageSize, section);
      
      set({
        activities: response.activities || response.data || [],
        pagination: {
          currentPage: response.currentPage || page,
          totalPages: response.totalPages || 1,
          totalItems: response.totalItems || 0,
          pageSize: response.pageSize || pageSize,
          hasNextPage: response.hasNextPage || false,
          hasPrevPage: response.hasPrevPage || false
        },
        filters: {
          ...get().filters,
          section
        }
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Obtener actividades disponibles para estudiante
  fetchAvailableActivitiesForStudent: async (studentId, page = 1, limit = 10, section = null) => {
    try {
      set({ loading: true, error: null });
      const response = await getAvailableActivitiesForStudent(studentId, page, limit, section);
      
      set({
        activities: response.activities || response.data || [],
        pagination: {
          currentPage: response.currentPage || page,
          totalPages: response.totalPages || 1,
          totalItems: response.totalItems || 0,
          pageSize: response.pageSize || limit,
          hasNextPage: response.hasNextPage || false,
          hasPrevPage: response.hasPrevPage || false
        },
        filters: {
          ...get().filters,
          section
        }
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Obtener todas las actividades
  fetchAllActivities: async () => {
    try {
      set({ loading: true, error: null });
      const activities = await getAllActivities();
      set({ activities });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Obtener actividad por ID
  fetchActivityById: async (activityId) => {
    try {
      set({ loading: true, error: null });
      const activity = await getActivityById(activityId);
      set({ currentActivity: activity });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  // Cambiar página
  setPage: (page) => {
    const { pagination } = get();
    if (page >= 1 && page <= pagination.totalPages) {
      set({
        pagination: {
          ...pagination,
          currentPage: page
        }
      });
    }
  },

  // Cambiar filtros
  setFilters: (filters) => {
    set({
      filters: {
        ...get().filters,
        ...filters
      },
      pagination: {
        ...get().pagination,
        currentPage: 1 // Resetear a la primera página al cambiar filtros
      }
    });
  },

  // Limpiar estado
  clearActivities: () => {
    set({
      activities: [],
      currentActivity: null,
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        pageSize: 10,
        hasNextPage: false,
        hasPrevPage: false
      }
    });
  }
}));

export default useActivityStore; 