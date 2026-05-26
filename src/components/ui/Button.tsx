import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, variant = 'primary', ...rest }: ButtonProps) {
  const isPrimary = variant === 'primary';
  
  return (
    <TouchableOpacity
      className={`py-4 rounded-xl items-center justify-center ${
        isPrimary ? 'bg-zelo-purple' : 'bg-transparent border-2 border-zelo-purple'
      }`}
      activeOpacity={0.7}
      {...rest}
    >
      <Text className={`font-bold text-lg ${
        isPrimary ? 'text-white' : 'text-zelo-purple'
      }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}