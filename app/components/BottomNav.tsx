import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useSegments } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function BottomNav() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const segments = useSegments()
  const knownTabs = ['Home', 'Profile']           
  const active = segments.find(s => knownTabs.includes(s)) ?? 'Home'

  return (
    <View
      style={{
        position: 'absolute',
        left:0 ,
        right: 0,
        bottom: 0,
        paddingBottom: insets.bottom + 9,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#1f1f1f',
          paddingVertical: 10,
          paddingHorizontal: 40,
          borderRadius: 999,
          width: 330,
          height: 70,
          justifyContent: 'space-between',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
          borderWidth: 0.5,
          borderColor: '#AC7F5E88',
        }}
      >
        <Pressable
          className='flex gap-1'
          onPress={() => router.push('/(tabs)/Home')}
          style={{ alignItems: 'center', paddingHorizontal: 12 }}
        >
          <Ionicons name="home-outline" size={24} color={active === 'Home' ? 'white' : '#999'} />
          <Text style={{ color: active === 'Home' ? 'white' : '#999', fontSize: 14 }}>Home</Text>
        </Pressable>

        <Pressable
          className='flex gap-1'
          onPress={() => router.push('/(tabs)/Profile')}
          style={{ alignItems: 'center', paddingHorizontal: 12 }}
        >
          <Feather name="user" size={24} color={active==='Profile' ? 'white' : '#999'} />
          <Text style={{ color: active === 'Profile' ? 'white' : '#999', fontSize: 14 }}>Profile</Text>
        </Pressable>
      </View>
    </View>
  )
}