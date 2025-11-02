import { images } from '@/constants/images'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, Text, View, useWindowDimensions } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../components/Button'

export default function Home() {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const [fontsLoaded] = useFonts({
    Satoshi: require('../../assets/fonts/LibreBaskerville-Regular.ttf'),
    Satoshi2: require('../../assets/fonts/LibreBaskerville-Italic.ttf'),
  })
  if (!fontsLoaded) return null

  const horizontalPadding = width * 0.08

  // Resolve asset size so we can compute a correct height for the image and center it
  const resolved = Image.resolveAssetSource(
    images.handPhoto || require('../../assets/image/handPhoto.png')
  )
  const imgAspect = resolved?.width && resolved?.height ? resolved.width / resolved.height : 1
  const imgWidth = width * 0.7
  const imgHeight = imgWidth / imgAspect
  const fontSize = width * 0.03 // 3% of screen width

  return (
    <LinearGradient colors={['#0b0b0b', '#262626', '#3a3a3a']} style={{ flex: 1 }}>
      <StatusBar style="light" translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          <Image
            source={images.logo}
            style={{ position: 'absolute', width: imgWidth, height: imgHeight, top: 0 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ paddingTop: insets.top + 25 }}>
          <View
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: 40,
            }}
          ></View>
        </View>
        <View style={{ position: 'absolute', top: insets.top + 40, left: 0, right: 0, bottom: 0 }}>
          <View className="flex-1 items-center justify-center">
            {/* sized container that matches image size so overlays are placed relative to the image */}
            <View
              style={{
                width: imgWidth,
                height: imgHeight,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 40,
              }}
            >
              <Image
                source={images.homePageLogo}
                style={{ position: 'absolute', width: imgWidth, height: imgHeight }}
                resizeMode="contain"
              />

              {/* Overlay text positioned absolutely inside the image bounds */}
              {/* <View style={{ position: 'absolute', width: imgWidth * 0.9, alignItems: 'center' }}>
              <Text
                style={{ fontFamily: 'Satoshi' }}
                className="text-white text-[26px] font-bold"
              >
                TRACK YOUR CALLS
              </Text>

              <Text
                style={{ fontFamily: 'Satoshi2' }}
                className="text-white italic text-[26px] mt-2"
              >
                to
              </Text>

              <Text
                style={{ fontFamily: 'Satoshi2' }}
                className="text-white italic text-[60px] font-bold mt-1"
              >
                SUCCESS
              </Text>
            </View> */}
            </View>
          </View>
          <View className="mt-6"></View>
          {/* Bottom button stays fixed at the bottom and won't be pushed by the image */}
          <View
            className="w-full items-center"
            style={{ bottom: insets.bottom + 16, paddingHorizontal: horizontalPadding }}
          >
            <Text
              className=""
              style={{ color: 'white', fontSize, fontWeight: '500', paddingBottom: 20 }}
            >
              Answer some questions to help secure the world!
            </Text>
            {/* Should be redirected to form */}
            <Button submit={() => router.push('/')} label={'Form'} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
