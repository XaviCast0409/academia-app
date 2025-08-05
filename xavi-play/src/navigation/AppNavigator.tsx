import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@/store/authStore';
import { useAppStateRefresh } from '@/hooks/useAppStateRefresh';
import { useAchievementRefresh } from '@/hooks/useAchievementRefresh';
import { useStreakUpdate } from '@/hooks/useStreakUpdate';
import { RootStackParamList, TabParamList } from '@/types/navigation';
import LoginPage from '@/components/auth/LoginPage';
import StorePage from '@/pages/StorePage';
import ActivitiesPage from '@/pages/ActivitiesPage';
import ProfilePage from '@/pages/ProfilePage';
import ActivityDetailsPage from '@/pages/ActivityDetailsPage';
import EvidencesPage from '@/pages/EvidencesPage';
import TransactionsPage from '@/pages/TransactionsPage';
import RankingPage from '@/pages/RankingPage';
import MissionsPage from '@/pages/MissionsPage';
import AchievementsPage from '@/pages/AchievementsPage';
import BottomTabBar from '@/components/navigation/BottomTabBar';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Tab navigator for authenticated screens
const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Profile" // Cambiar pantalla inicial a Profile
    >
      <Tab.Screen name="Profile" component={ProfilePage} />
      <Tab.Screen name="Store" component={StorePage} />
      <Tab.Screen name="Activities" component={ActivitiesPage} />
    </Tab.Navigator>
  );
};

// Main app navigator
const AppNavigator: React.FC = () => {
  const { isAuthenticated, initializeAuth } = useAuthStore();
  
  // Hook para refrescar datos cuando la app vuelve a estar activa
  useAppStateRefresh();
  
  // Hook para manejar logros automáticamente
  useAchievementRefresh();
  
  // Hook para manejar racha automáticamente  
  useStreakUpdate();

  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginPage} />
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="ActivityDetails" component={ActivityDetailsPage} />
            <Stack.Screen name="Evidences" component={EvidencesPage} />
            <Stack.Screen name="Transactions" component={TransactionsPage} />
            <Stack.Screen name="Ranking" component={RankingPage} />
            <Stack.Screen name="Missions" component={MissionsPage} />
            <Stack.Screen name="Achievements" component={AchievementsPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 