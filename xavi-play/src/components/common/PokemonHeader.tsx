import React from 'react';
import { View, Text, Image } from 'react-native';
import { headerStyles } from '@/styles/header.styles';

interface PokemonHeaderProps {
  title: string;
  coins?: number;
}

const PokemonHeader: React.FC<PokemonHeaderProps> = ({ title, coins }) => {
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.content}>
        <Text style={headerStyles.title}>{title}</Text>
        {coins !== undefined && (
          <View style={headerStyles.coinsContainer}>
            <Image
              source={{
                uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
              }}
              style={headerStyles.coinIcon}
              resizeMode="contain"
            />
            <Text style={headerStyles.coinsText}>{coins}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default PokemonHeader; 