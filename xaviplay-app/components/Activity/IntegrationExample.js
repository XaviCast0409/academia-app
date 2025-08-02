// Ejemplo de integración de los componentes de actividades
// Este archivo muestra cómo integrar los componentes en tu navegación

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityScreen, ActivityDetailScreen } from './index';

const Stack = createNativeStackNavigator();

// Ejemplo de navegación con actividades
const ActivityNavigationExample = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Activities" 
          component={ActivityScreen}
          options={{ 
            title: 'Actividades',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="ActivityDetail" 
          component={ActivityDetailScreen}
          options={{ 
            title: 'Detalle de Actividad',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Ejemplo de cómo agregar un botón de navegación a actividades
const NavigationButtonExample = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        margin: 10,
      }}
      onPress={() => navigation.navigate('Activities')}
    >
      <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>
        Ver Actividades
      </Text>
    </TouchableOpacity>
  );
};

// Ejemplo de uso del store en un componente
const StoreUsageExample = () => {
  const { activities, loading, fetchActivitiesByProfessor } = useActivityStore();
  
  useEffect(() => {
    // Cargar actividades al montar el componente
    fetchActivitiesByProfessor(1, 1, 10);
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Text>Total de actividades: {activities.length}</Text>
      )}
    </View>
  );
};

export default ActivityNavigationExample; 