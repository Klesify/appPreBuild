import { Tabs } from 'expo-router'
import React from 'react'
import BottomNav from '../components/BottomNav'

export default function TabsLayout() {
  return (
    <>
      <Tabs screenOptions={{ tabBarStyle: { display: 'none' } }}>
        {/* Hide native header on Home because Home renders a custom header inside the screen */}
        <Tabs.Screen name="Home" options={{ headerShown: false }} />

        {/* Show header on Profile (default) - explicit for clarity */}
        <Tabs.Screen name="Profile" options={{ headerShown: true }} />
      </Tabs>
      <BottomNav />
    </>
  )
}