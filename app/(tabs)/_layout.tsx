// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* index.tsx rămâne ecran în grup, dar fără buton în tab bar */}
      <Tabs.Screen
        name="index"
        options={{
          // ascunde butonul din tab bar
          tabBarButton: () => null,
          // also hide the tab bar UI when this screen is active
          tabBarStyle: { display: 'none' },
        }}
      />

      {/* Home - vizibil în tab bar */}
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />

      {/* Profile - vizibil în tab bar */}
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
          // hide the tab bar when Profile is active (only show tabs on Home)
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  )
}