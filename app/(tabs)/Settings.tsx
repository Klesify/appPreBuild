import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Bell, LogOut } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, Switch, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false)

  const insets = useSafeAreaInsets()
  const [fontsLoaded] = useFonts({
    Satoshi: require('../../assets/fonts/LibreBaskerville-Regular.ttf'),
    Satoshi2: require('../../assets/fonts/LibreBaskerville-Italic.ttf'),
  })
  if (!fontsLoaded) return null

  const toggleSwitch = () => setIsEnabled((prev) => !prev)
  const logout = () => {
    router.replace('/(auth)/Login')
  }

  return (
    <LinearGradient colors={['#0b0b0b', '#262626', '#3a3a3a']} style={{ flex: 1 }}>
      <StatusBar style="light" translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: insets.top,
            paddingBottom: insets.bottom + 150,
          }}
        >
          <View className="w-full items-center px-[20px] ">
            <View>
              <Text style={{ fontSize: 28, color: 'white' ,fontWeight: '700'}} className='-top-[220px]'>Settings</Text>
            </View>
            <View className="mb-4 w-[90%] rounded-full border border-[#4BA3C3] px-6 py-3 text-white">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center">
                  <View className="mr-3 h-10 w-10 items-center justify-center rounded-full border border-[#4BA3C3]">
                    <Bell size={20} color="#4BA3C3" strokeWidth={1.5} />
                  </View>
                  <Pressable onPress={logout} style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>Allow calls</Text>
                  </Pressable>
                </View>
                <View style={{ transform: [{ scale: 1.3 }] }}>
                  <Switch
                    trackColor={{ false: '#767577', true: '#3ed818ff' }}
                    thumbColor={'#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </View>
            <View className="mb-4 w-[90%] rounded-full border border-[#4BA3C3] px-6 py-3 text-white">
              <Pressable
                onPress={() => router.replace('/(auth)/Login')}
                className="flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <View className="mr-3 h-10 w-10 items-center justify-center rounded-full border border-[#4BA3C3]">
                    <LogOut size={20} color="#4BA3C3" strokeWidth={1.5} />
                  </View>
                  <Text style={{ fontSize: 18, color: 'white' }}>Log out</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}