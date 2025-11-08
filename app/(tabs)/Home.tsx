import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Asset } from 'expo-asset';
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({
    Satoshi: require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
    Satoshi2: require("../../assets/fonts/LibreBaskerville-Italic.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <LinearGradient
      colors={["#0b0b0b", "#262626", "#3a3a3a"]}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
          <View style={{ paddingHorizontal: 0 }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#1f1f1f',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 28,
              borderBottomRightRadius: 28,
              paddingTop: insets.top + 16,
              paddingBottom: 30,
              paddingHorizontal: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 10,
              
            }}>
              <Text style={{ color: 'white', fontSize: 28, fontWeight: '800', fontFamily: 'Satoshi', textTransform: 'uppercase' }}>Klesify</Text>
              <Pressable onPress={() => router.push('/Login')} style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF1A', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons name="account-check-outline" size={24} color="white" />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', top: insets.top + 120, left: 0, right: 0, bottom: 0 }}>
        <View className="absolute inset-0 flex items-center flex-col gap-4">  
             <View className="mt-6">
            <Text className="" style={{ color: 'white', fontSize: 19, fontWeight: '400' }}>
                Start your journey with us!
            </Text>
            </View>
            <Pressable
              onPress={async () => {
                // Simulate an incoming call first; we pass phone + optional ring asset
                try {
                  const asset = Asset.fromModule(require('../../assets/audios/Marcel_Mondialu_scam.wav'))
                  if (!asset.localUri && !asset.downloaded) await asset.downloadAsync()
                  const ringUri = asset.localUri ?? asset.uri
                  router.push({ pathname: '/(calls)/IncomingCall', params: { phone: '+111 222 333', ring: ringUri } })
                } catch (e) {
                  console.warn('Failed to load ring asset', e)
                  router.push({ pathname: '/(calls)/IncomingCall', params: { phone: '+111 222 333' } })
                }
              }}
              className="mt-10 h-16 w-100 px-6 rounded-full bg-[#1f1f1f] border border-[#4BA3C3] items-center justify-center"
            >
              <Text style={{ color: 'white', fontWeight: '600' ,fontSize:16}}>Simulate Call</Text>
            </Pressable>
            
       </View>
      </View>
     </SafeAreaView> 
    </LinearGradient>
  );
}
