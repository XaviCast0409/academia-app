import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './RecompensaStyles';
import { useProductStore } from '../../../../store/productStore';

const COLORS = [
  '#FFD966', // amarillo pastel
  '#A0E060', // verde
  '#F7C873', // amarillo
  '#6DD6E7', // azul claro
  '#F78C8C', // rojo
  '#B39DDB', // lila
  '#90CAF9', // azul pastel
  '#FFB74D', // naranja
];

const POKEMON_PLACEHOLDER = require('../../../../assets/pokeball.jpg');

export default function RecompensaCard({ item, index, onDeleted }) {
  const color = COLORS[index % COLORS.length];
  const deleteProduct = useProductStore(state => state.deleteProduct);

  const handleDelete = async () => {
    Alert.alert(
      'Eliminar producto',
      `¿Seguro que deseas eliminar "${item.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', style: 'destructive', onPress: async () => {
            const ok = await deleteProduct(item.id);
            if (ok && onDeleted) onDeleted();
            if (ok) {
              Alert.alert('Producto borrado', 'El producto fue eliminado correctamente.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={[styles.shopCard, { backgroundColor: color }]}>  
      <Text style={styles.shopCardTitle}>{item.name}</Text>
      <View style={styles.shopCardImageWrap}>
        <Image source={POKEMON_PLACEHOLDER} style={styles.shopCardImage} resizeMode="contain" />
      </View>
      <Text style={styles.shopCardDesc}>{item.description}</Text>
      <View style={styles.shopCardPriceWrap}>
        <MaterialCommunityIcons name="bitcoin" size={28} color="#ffcb05" />
        <Text style={styles.shopCardPrice}>{item.price}</Text>
        <TouchableOpacity style={{ marginLeft: 12 }} onPress={handleDelete}>
          <MaterialCommunityIcons name="delete" size={28} color="#e3350d" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
