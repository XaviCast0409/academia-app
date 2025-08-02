import React, { useState, useEffect } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import FloatingMenu from './FloatingMenu';
import DashboardView from '../views/Dashboard/DashboardView';
import RecompensaView from '../views/Recompensa/RecompensaView';
import { useAuthStore } from '../../../store/authStore';

const VIEWS = {
  perfil: <DashboardView />,
  recompensa: <RecompensaView />,
  actividades: <DashboardView />,
  evidencias: <DashboardView />,
  transacciones: <DashboardView />,
};

export default function AdminLayout() {
  const [activeView, setActiveView] = useState('perfil');
  const [isUnmounting, setIsUnmounting] = useState(false);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    return () => {
      setIsUnmounting(true);
    };
  }, []);

  // Pasar el handler al menú flotante
  const handleMenuSelect = (view) => {
    if (!isUnmounting) {
      setActiveView(view);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/fondo.png')} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.viewContainer}>{VIEWS[activeView]}</View>
        <View style={styles.fabWrapper} pointerEvents="box-none">
          <FloatingMenu onSelect={handleMenuSelect} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(59,76,202,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  viewContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabWrapper: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    zIndex: 100,
    alignItems: 'flex-end',
  },
});
