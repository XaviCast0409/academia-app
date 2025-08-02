import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FloatingMenu({ onSelect }) {
  const [visible, setVisible] = useState(false);
  const [anim] = useState(new Animated.Value(0));

  const openMenu = () => {
    setVisible(true);
    Animated.timing(anim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  };
  const closeMenu = () => {
    Animated.timing(anim, { toValue: 0, duration: 100, useNativeDriver: true }).start(() => setVisible(false));
  };

  const handleSelect = (view, customOnPress) => {
    closeMenu();
    if (customOnPress) {
      customOnPress();
    } else if (onSelect) {
      onSelect(view);
    }
  };

  // Posiciones radiales para 6 botones
  const radius = 100;
  const buttons = [
    {
      key: 'perfil',
      icon: 'account-tie',
      label: 'Perfil Profesor',
      angle: -10,
      color: '#3b4cca',
    },
    {
      key: 'recompensa',
      icon: 'star-circle-outline',
      label: 'Recompensa',
      angle: -65,
      color: '#ffcb05',
    },
    {
      key: 'actividades',
      icon: 'run-fast',
      label: 'Actividades',
      angle: -110,
      color: '#e3350d',
    },
    {
      key: 'evidencias',
      icon: 'camera-outline',
      label: 'Evidencias',
      angle: -160,
      color: '#2ecc40',
    },
    {
      key: 'transacciones',
      icon: 'swap-horizontal',
      label: 'Transacciones',
      angle: -210,
      color: '#ff9800',
    }
  ];

  return (
    <View style={styles.absoluteWrapper} pointerEvents="box-none">
      <FAB
        icon="menu"
        style={styles.fab}
        color="#fff"
        onPress={openMenu}
      />
      {visible && (
        <View style={styles.radialOverlay} pointerEvents="box-none">
          {buttons.map((btn, i) => {
            const angleRad = (btn.angle * Math.PI) / 180;
            const x = radius * Math.cos(angleRad);
            const y = radius * Math.sin(angleRad);
            return (
              <Animated.View
                key={btn.key}
                style={[
                  styles.radialButton,
                  {
                    backgroundColor: btn.color,
                    position: 'absolute',
                    left: 150 + x,
                    top: 150 + y,
                    opacity: anim,
                    transform: [
                      { scale: anim },
                    ],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleSelect(btn.key, btn.onPress)}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons name={btn.icon} size={32} color="#fff" />
                  <Text style={styles.radialLabel}>{btn.label}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
          {/* Fondo para cerrar el menú */}
          <TouchableOpacity style={styles.radialBg} activeOpacity={1} onPress={closeMenu} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteWrapper: {
    position: 'absolute',
    right: 34,
    bottom: 32,
    zIndex: 100,
    alignItems: 'flex-end',
  },
  fab: {
    backgroundColor: '#e3350d',
  },
  radialOverlay: {
    position: 'absolute',
    right: 80,
    bottom: 80,
    width: 200,
    height: 200,
    zIndex: 200,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  radialBg: {
    position: 'absolute',
    left: 30,
    top: 30,
    width: 300,
    height: 300,
    borderRadius: 200,
    backgroundColor: 'rgba(0,0,0,0.15)',
    zIndex: 1,
  },
  radialButton: {
    width: 70,
    height: 70,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    zIndex: 10,
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  radialLabel: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginTop: 2,
    textAlign: 'center',
    textShadowColor: '#222',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
