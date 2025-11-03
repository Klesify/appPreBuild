import Entypo from '@expo/vector-icons/Entypo'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Choose() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [fontsLoaded] = useFonts({
    Satoshi: require('../../assets/fonts/LibreBaskerville-Regular.ttf'),
    Satoshi2: require('../../assets/fonts/LibreBaskerville-Italic.ttf'),
  })
  if (!fontsLoaded) return null

  return (
    <LinearGradient colors={['#0b0b0b', '#262626', '#3a3a3a']} style={{ flex: 1 }}>
      <StatusBar style="light" translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={{ paddingTop: insets.top + 25 }}>
          <View className="absolute left-4 top-[-40px] ">
            <Pressable
              onPress={() => router.back()}
              className="mt-14 h-12 w-12 items-center justify-center self-start rounded-full bg-[#FFFFFF1A]"
            >
              <Entypo name="chevron-left" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View style={{ position: 'absolute', top: insets.top + 200, left: 0, right: 0, bottom: 0 }}>
          <View className="absolute inset-0 flex flex-col items-center gap-4">
            <Text
              className=""
              style={{ fontFamily: 'Satoshi', color: 'white', fontSize: 30, fontWeight: 'bold' }}
            >
              WELCOME TO
            </Text>
            <Text
              className=""
              style={{ fontFamily: 'Satoshi', color: 'white', fontSize: 30, fontWeight: 'bold' }}
            >
              KLESIFY
            </Text>
            <View className="mt-6">
              <Text className="" style={{ color: 'white', fontSize: 19, fontWeight: '400' }}>
                Start your journey with us!
              </Text>
            </View>
            {/* Buttons placed directly under the text, inside the same flow */}
            <View className="mt-11 flex flex-col items-center gap-4">
              <View>
                <Pressable
                  onPress={() => router.push('/Signup')}
                  className="rounded-full border-2  border-[#AC7F5E] bg-[#202020] px-[90px] py-[16px]"
                >
                  <Text className="text-[18px] font-semibold text-white">Create account</Text>
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={() => router.push('/Login')}
                  className="rounded-full border-2 border-[#161616] bg-[#1d1d1d] px-[129px] py-[16px]"
                >
                  <Text className="text-[18px] font-semibold text-white">Sign In</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
