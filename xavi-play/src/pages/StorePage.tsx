import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { storeStyles } from '@/styles/store.styles';
import { useAuthStore } from '@/store/authStore';

const StorePage: React.FC = () => {
  const { user } = useAuthStore();
  
  // Mock data for store items
  const storeItems = [
    {
      id: '1',
      name: 'Pokeball',
      price: 100,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
      description: 'Para capturar Pokémon',
    },
    {
      id: '2',
      name: 'Potion',
      price: 50,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/potion.png',
      description: 'Restaura HP',
    },
    {
      id: '3',
      name: 'Super Potion',
      price: 200,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/super-potion.png',
      description: 'Restaura más HP',
    },
    {
      id: '4',
      name: 'Great Ball',
      price: 300,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png',
      description: 'Mejor probabilidad de captura',
    },
    {
      id: '5',
      name: 'Ultra Ball',
      price: 500,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png',
      description: 'Alta probabilidad de captura',
    },
    {
      id: '6',
      name: 'Master Ball',
      price: 1000,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png',
      description: 'Captura garantizada',
    },
    {
      id: '7',
      name: 'Revive',
      price: 150,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/revive.png',
      description: 'Revive Pokémon desmayados',
    },
    {
      id: '8',
      name: 'Max Revive',
      price: 400,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/max-revive.png',
      description: 'Revive con HP completo',
    },
  ];

  return (
    <ScreenWrapper>
      <PokemonHeader title="Tienda Pokémon" coins={user?.xaviCoins || 0} />
      <ScrollView 
        style={storeStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={storeStyles.itemsContainer}>
          {storeItems.map((item) => (
            <TouchableOpacity key={item.id} style={storeStyles.itemCard}>
              <Image source={{ uri: item.image }} style={storeStyles.itemImage} />
              <View style={storeStyles.itemInfo}>
                <Text style={storeStyles.itemName}>{item.name}</Text>
                <Text style={storeStyles.itemDescription}>{item.description}</Text>
                <View style={storeStyles.priceContainer}>
                  <Text style={storeStyles.price}>{item.price}</Text>
                  <Text style={storeStyles.currency}> XaviCoins</Text>
                </View>
              </View>
              <TouchableOpacity style={storeStyles.buyButton}>
                <Text style={storeStyles.buyButtonText}>Comprar</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default StorePage; 