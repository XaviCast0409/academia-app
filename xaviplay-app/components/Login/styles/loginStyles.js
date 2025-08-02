import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b4cca',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    color: '#ffcb05',
    fontWeight: 'bold',
    marginBottom: 32,
    fontFamily: 'monospace',
    textShadowColor: '#2a75bb',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  button: {
    backgroundColor: '#ffcb05',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 24,
    shadowColor: '#2a75bb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#3b4cca',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  error: {
    color: '#d32f2f',
    marginTop: 8,
    fontWeight: 'bold',
  },
});
