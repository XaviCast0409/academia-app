import { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

export default function PokemonInput({ placeholder, value, onChangeText, secureTextEntry, icon }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = !!secureTextEntry;

  // Iconos: pokeball, lock
  const renderLeftIcon = () => {
    if (icon === 'pokeball') {
      return <MaterialCommunityIcons name="pokeball" size={28} color="#e3350d" style={styles.icon} />;
    }
    if (icon === 'lock') {
      return <MaterialCommunityIcons name="lock" size={28} color="#2a75bb" style={styles.icon} />;
    }
    return null;
  };

  return (
    <View style={styles.inputContainer}>
      {renderLeftIcon()}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        placeholderTextColor="#bdbdbd"
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
          <Feather
            name={showPassword ? 'eye-off' : 'eye'}
            size={26}
            color="#2a75bb"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5e663',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#ffcb05',
    shadowColor: '#2a75bb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 18,
    color: '#2a75bb',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  eyeIcon: {
    width: 26,
    height: 26,
    marginLeft: 8,
    tintColor: '#2a75bb',
  },
});
