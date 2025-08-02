import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/types/navigation';
import { tabBarStyles } from '@/styles/tabBar.styles';

type TabNavigationProp = BottomTabNavigationProp<TabParamList>;

interface BottomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  insets: any;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const route = useRoute();

  const isActive = (routeName: keyof TabParamList) => {
    return state.index === state.routes.findIndex((route: any) => route.name === routeName);
  };

  const tabs = [
    {
      name: 'Profile' as keyof TabParamList,
      label: 'Perfil',
      icon: '👤',
    },
    {
      name: 'Store' as keyof TabParamList,
      label: 'Tienda',
      icon: '🛍️',
    },
    {
      name: 'Activities' as keyof TabParamList,
      label: 'Actividades',
      icon: '📝',
    },
  ];

  return (
    <View style={tabBarStyles.container}>
      <View style={tabBarStyles.tabsRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              tabBarStyles.tab,
              isActive(tab.name) && tabBarStyles.activeTab,
            ]}
            onPress={() => navigation.navigate(tab.name)}
          >
            <Text style={tabBarStyles.icon}>{tab.icon}</Text>
            <Text
              style={[
                tabBarStyles.label,
                isActive(tab.name) && tabBarStyles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomTabBar; 