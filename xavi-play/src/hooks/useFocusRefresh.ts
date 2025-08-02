import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthStore } from '@/store/authStore';

export const useFocusRefresh = () => {
  const { refreshUserData } = useAuthStore();

  useFocusEffect(
    React.useCallback(() => {
      // Refrescar datos cuando la pantalla obtiene el foco
      refreshUserData();
    }, [refreshUserData])
  );
}; 