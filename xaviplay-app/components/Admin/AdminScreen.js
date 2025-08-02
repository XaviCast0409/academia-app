import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AdminLayout from './components/AdminLayout';
import { useAuthStore } from '../../store/authStore';

export default function AdminScreen() {
    const navigation = useNavigation();
    const isAuthenticated = useAuthStore(state => state.isAuthenticated());

    useEffect(() => {
        if (!isAuthenticated) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }, [isAuthenticated, navigation]);

    return isAuthenticated ? <AdminLayout /> : null;
}
