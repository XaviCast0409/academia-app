import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './RecompensaStyles';
import { useProductStore } from '../../../../store/productStore';
import RecompensaCard from './RecompensaCard';
import AddProductModal from './AddProductModal';

export default function RecompensaView() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item, index }) => (
    <RecompensaCard item={item} index={index} />
  );

  // Agregar carta de "añadir"
  const dataWithAdd = [...products, { isAdd: true }];

  if (loading) return <ActivityIndicator size="large" color="#3b4cca" style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienda de Recompensas</Text>
      <FlatList
        data={dataWithAdd}
        keyExtractor={(item, idx) => item.id ? item.id.toString() : 'add'}
        renderItem={({ item, index }) =>
          item.isAdd ? (
            <TouchableOpacity
              style={styles.shopCardAdd}
              activeOpacity={0.7}
              onPress={() => setShowModal(true)}
            >
              <MaterialCommunityIcons name="plus-circle-outline" style={styles.shopCardAddIcon} />
              <Text style={styles.shopCardAddText}>Agregar</Text>
            </TouchableOpacity>
          ) : (
            <RecompensaCard item={item} index={index} onDeleted={() => {}} />
          )
        }
        contentContainerStyle={{ paddingBottom: 32, paddingLeft: 16, paddingRight: 16 }}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      <AddProductModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}

