import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PokemonInput from './inputs/PokemonInput';
import { useLogin } from './logic/useLogin';
import { loginStyles } from './styles/loginStyles';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, handleLogin, clearError } = useLogin();
  const clearAuth = useAuthStore(state => state.clearAuth);

  // Clear any errors when inputs change
  useEffect(() => {
    if (error) clearError();
  }, [email, password]);

  useEffect(() => {
    clearAuth();
  }, []);

  return (
    <View style={loginStyles.container}>
      {/* Puedes agregar un logo aquí si lo deseas */}
      <Text style={loginStyles.title}>Ingresar</Text>
      <PokemonInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        icon="pokeball"
      />
      <PokemonInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        icon="lock"
      />
      {error ? <Text style={loginStyles.error}>{error}</Text> : null}
      <TouchableOpacity
        style={loginStyles.button}
        onPress={() => handleLogin(email, password)}
        disabled={loading}
      >
        <Text style={loginStyles.buttonText}>{loading ? 'Cargando...' : '¡Atrápalos ya!'}</Text>
      </TouchableOpacity>
    </View>
  );
}
