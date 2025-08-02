import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@/store/authStore';
import { RootStackParamList, TabParamList } from '@/types/navigation';
import LoginPage from '@/components/auth/LoginPage';
import StorePage from '@/pages/StorePage';
import ActivitiesPage from '@/pages/ActivitiesPage';
import ProfilePage from '@/pages/ProfilePage';
import BottomTabBar from '@/components/navigation/BottomTabBar';
import MainLayout from '@/components/common/MainLayout';

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
    >
      <Tab.Screen name="Store" component={StorePage} />
      <Tab.Screen name="Activities" component={ActivitiesPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

// Main app navigator
const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginPage} />
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 