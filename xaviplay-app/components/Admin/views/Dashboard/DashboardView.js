import { View, Text, StyleSheet } from 'react-native';
import ProfileCard from '../../components/ProfileCard';

export default function DashboardView() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Panel de Profesor</Text>
            <ProfileCard />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 22,
        color: '#3b4cca',
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    title: {
        fontSize: 28,
        color: '#ffcb05',
        fontWeight: 'bold',
        marginBottom: 32,
        fontFamily: 'monospace',
        textAlign: 'center',
        textShadowColor: '#2a75bb',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
});
