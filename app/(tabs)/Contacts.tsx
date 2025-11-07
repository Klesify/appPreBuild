import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { router, Stack } from 'expo-router'
import React, { useMemo } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ContactItem, contacts } from '../../data/contacts'

export default function ContactsScreen() {
  const insets = useSafeAreaInsets()
  const [fontsLoaded] = useFonts({
    Satoshi: require('../../assets/fonts/LibreBaskerville-Regular.ttf'),
    Satoshi2: require('../../assets/fonts/LibreBaskerville-Italic.ttf'),
  })
  const data = useMemo(() => contacts, [])
  if (!fontsLoaded) return null

  const renderItem = ({ item }: { item: ContactItem }) => (
    <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/10">
      <View>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
        <Text style={{ color: '#cccccc', fontSize: 14 }}>{item.phone}</Text>
      </View>
      <Pressable
        onPress={() => router.push({
          pathname: '/(calls)/OutgoingCall',
          params: { phone: item.phone, name: item.name }
        })}
        className="h-10 px-4 rounded-full bg-[#129e27] items-center justify-center"
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Call</Text>
      </Pressable>
    </View>
  )

  return (
    <LinearGradient colors={['#0b0b0b', '#262626', '#3a3a3a']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ paddingTop: insets.top + 25 }} className="px-4 mb-4">
          <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>Contacts</Text>
          <Text style={{ color: '#aaaaaa', marginTop: 4 }}>Choose someone to call</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}
