import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Star, BadgeCheck } from 'lucide-react-native';

interface ProfessionalCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
}

export function ProfessionalCard({ id, name, category, rating, image }: ProfessionalCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => router.push(`/professional/${id}`)}
      className="bg-white p-4 rounded-2xl mb-4 shadow-sm flex-row items-center justify-between"
    >
      <View className="flex-row items-center flex-1">
        <Image 
          source={{ uri: image }} 
          className="w-16 h-16 rounded-full mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">{name}</Text>
          <View className="flex-row items-center mt-1">
            <BadgeCheck size={14} color="#5B21B6" />
            <Text className="text-xs text-zelo-purple font-semibold ml-1 mr-2">Verificado</Text>
          </View>
          <Text className="text-gray-500 text-sm mt-1">{category}</Text>
          <View className="flex-row items-center mt-1">
            <Star size={14} color="#EAB308" fill="#EAB308" />
            <Text className="text-sm font-bold text-gray-700 ml-1">{rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity className="bg-zelo-purple p-3 rounded-xl">
        <Phone size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}