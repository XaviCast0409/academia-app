
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppNavigation from './navigation';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigation />
      <StatusBar style="auto" />
    </View>
  );
}

// ...estilos eliminados, ahora los estilos están modularizados en cada componente
