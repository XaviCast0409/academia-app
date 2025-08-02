import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#dc2626', // red-600
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 4,
    borderBottomColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbbf24', // yellow-400
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#1e40af', // blue-800
  },
  coinIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  coinsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af', // blue-800
  },
}); 