// import { Tabs } from 'expo-router'
// import React from 'react'

// const _Layout = () => {
//   return (
//     <Tabs>
//         <Tabs.Screen
//             name="index"
//             options={{
//                 title: 'Home',
//                 headerShown: false,
               
//             }}
//             />
//         <Tabs.Screen
//             name="Saved"
//             options={{
//                 title: 'Saved',
//                 headerShown: false,
//             }}
//         />
//         <Tabs.Screen
//             name="Profile"
//             options={{
//                 title: 'Profile',
//                 headerShown: false,
//             }}
//         />
//     </Tabs>
//   )
// }

// export default _Layout

// app/(tabs)/_layout.tsx
import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // hides navbar for all screens in this group
      }}
    />
  );
}
