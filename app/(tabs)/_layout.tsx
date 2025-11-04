import { Tabs } from 'expo-router'
import React from 'react'
import BottomNav from '../components/BottomNav'

export default function TabsLayout() {
  return (
    <>
      <Tabs screenOptions={{ tabBarStyle: { display: 'none' } }}>
        <Tabs.Screen name="Home" options={{ headerShown: false }} />
        <Tabs.Screen name="Profile" options={{ headerShown: false }} />
      </Tabs>
      <BottomNav />
    </>
  )
}