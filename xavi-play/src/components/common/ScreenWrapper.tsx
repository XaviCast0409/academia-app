import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: any;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={['top']}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', // gray-100
  },
});

export default ScreenWrapper; 