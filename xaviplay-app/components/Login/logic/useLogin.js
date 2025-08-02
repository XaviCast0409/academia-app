import { useAuthStore } from '../../../store/authStore';
import { useNavigation } from '@react-navigation/native';

export function useLogin() {
  const { login, loading, error, clearError } = useAuthStore();
  const navigation = useNavigation();

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      
      // Navigate based on role
      if (data.user.roleId === 1 || data.user.roleId === 2) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Admin' }],
        });
      }
      // Add more role-based navigation here if needed
    } catch (err) {
      // Error is already handled in the store
      console.error('Login failed:', err.message);
    }
  };

  return { loading, error, handleLogin, clearError };
}
