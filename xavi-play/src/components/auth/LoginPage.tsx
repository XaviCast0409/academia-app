import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginStyles } from '@/styles/login.styles';
import { LoginPageProps } from '@/types/auth';
import { useAuthStore } from '@/store/authStore';
import { User } from '@/types/user';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  const { login } = useAuthStore();

  const handleSubmit = () => {
    if (username.trim() && password.trim()) {
      // Mock user data - in real app this would come from API
      const mockUser: User = {
        id: '1',
        username: username.trim(),
        level: 5,
        experience: 45,
        xaviCoins: 1500,
        completedActivities: 12,
        totalXaviCoins: 3250,
        currentStreak: 5,
        purchasedItems: 8,
        avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      };
      
      login(mockUser);
      onLogin?.();
    }
  };

  const isFormValid = username.trim() && password.trim();

  return (
    <SafeAreaView style={loginStyles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            backgroundColor: '#dc2626',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={loginStyles.contentContainer}>
            {/* Pokemon Logo */}
            <View style={loginStyles.logoContainer}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png',
                }}
                style={loginStyles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Login Form */}
            <View style={loginStyles.formContainer}>
              {/* Pokeball Icon */}
              <View style={loginStyles.pokeballContainer}>
                <View style={loginStyles.pokeball}>
                  <View style={loginStyles.pokeballCenter} />
                </View>
              </View>

              <Text style={loginStyles.title}>
                ¡Inicia tu aventura Pokémon!
              </Text>

              <View style={loginStyles.inputContainer}>
                <Text style={loginStyles.label}>Nombre de Entrenador</Text>
                <TextInput
                  mode="outlined"
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Ash Ketchum"
                  style={[
                    loginStyles.input,
                    usernameFocused && loginStyles.inputFocused,
                  ]}
                  outlineColor="#d1d5db"
                  activeOutlineColor="#fbbf24"
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                  theme={{
                    colors: {
                      primary: '#fbbf24',
                    },
                  }}
                />
              </View>

              <View style={loginStyles.inputContainer}>
                <Text style={loginStyles.label}>Contraseña</Text>
                <TextInput
                  mode="outlined"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  style={[
                    loginStyles.input,
                    passwordFocused && loginStyles.inputFocused,
                  ]}
                  outlineColor="#d1d5db"
                  activeOutlineColor="#fbbf24"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  theme={{
                    colors: {
                      primary: '#fbbf24',
                    },
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!isFormValid}
                style={[
                  loginStyles.button,
                  !isFormValid && loginStyles.buttonDisabled,
                ]}
              >
                <Text
                  style={[
                    loginStyles.buttonText,
                    !isFormValid && loginStyles.buttonTextDisabled,
                  ]}
                >
                  ¡Quiero ser el mejor!
                </Text>
              </TouchableOpacity>
            </View>

            {/* Pikachu Image */}
            <View style={loginStyles.pikachuContainer}>
              <Image
                source={{
                  uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
                }}
                style={loginStyles.pikachu}
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPage; 