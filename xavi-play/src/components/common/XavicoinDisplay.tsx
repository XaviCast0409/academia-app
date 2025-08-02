import React from 'react';
import { View, Text, Image } from 'react-native';
import { xavicoinStyles } from '@/styles/xavicoin.styles';

interface XavicoinDisplayProps {
  amount: number;
  size?: 'small' | 'medium' | 'large';
}

const XavicoinDisplay: React.FC<XavicoinDisplayProps> = ({ 
  amount, 
  size = 'medium' 
}) => {
  return (
    <View style={[xavicoinStyles.container, xavicoinStyles[size]]}>
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
        }}
        style={xavicoinStyles.icon}
        resizeMode="contain"
      />
      <Text style={[xavicoinStyles.text, xavicoinStyles[`${size}Text`]]}>
        {amount}
      </Text>
    </View>
  );
};

export default XavicoinDisplay; 