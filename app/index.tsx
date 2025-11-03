import { images } from "@/constants/images";
import Entypo from "@expo/vector-icons/Entypo";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { width } = useWindowDimensions(); 
  const insets = useSafeAreaInsets();

  const [fontsLoaded] = useFonts({
    Satoshi: require("../assets/fonts/LibreBaskerville-Regular.ttf"),
    Satoshi2: require("../assets/fonts/LibreBaskerville-Italic.ttf"),
  });
  if (!fontsLoaded) return null;

 
  const horizontalPadding = width * 0.08;

  // Resolve asset size so we can compute a correct height for the image and center it
  const resolved = Image.resolveAssetSource(images.handPhoto || require("../assets/image/handPhoto.png"));
  const imgAspect = resolved?.width && resolved?.height ? resolved.width / resolved.height : 1;
  const imgWidth = width * 0.7;
  const imgHeight = imgWidth / imgAspect;

  return (
    <LinearGradient
      colors={["#0b0b0b", "#262626", "#3a3a3a"]}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={{ paddingTop: insets.top + 25 }}>
        <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop:40}}>
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
          </View>
     </View>
  <View style={{ position: 'absolute', top: insets.top + 40, left: 0, right: 0, bottom: 0 }}>
        <View className="flex-1 justify-center items-center">
          {/* sized container that matches image size so overlays are placed relative to the image */}
          <View style={{ width: imgWidth, height: imgHeight, justifyContent: 'center', alignItems: 'center', marginTop:40 }}>
            <Image
              source={images.handPhoto}
              style={{ position: 'absolute', width: imgWidth, height: imgHeight }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          className="absolute left-0 right-0"
          style={{ bottom: insets.bottom + 16, paddingHorizontal: horizontalPadding }}
        >
          <View className="items-center">
            <Pressable
              onPress={() => router.push("/(auth)/Choose")}
              className="px-6 py-4 rounded-full bg-black/40 w-[100%] border-neutral-900 border-2 justify-between flex-row items-center"
            >
              <Text className="text-white font-semibold text-lg">Get Started</Text>
              <View className="rounded-full w-10 h-10 bg-white justify-center items-center">
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </LinearGradient>
  );
}
