import { images } from "@/constants/images";
import Entypo from "@expo/vector-icons/Entypo";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { ImageBackground, Pressable, Text, View, useWindowDimensions } from "react-native";

export default function Index() {
  const router = useRouter();
  const { width } = useWindowDimensions(); 

  const [fontsLoaded] = useFonts({
    Satoshi: require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
    Satoshi2: require("../../assets/fonts/LibreBaskerville-Italic.ttf"),
  });
  if (!fontsLoaded) return null;

 
  const horizontalPadding = width * 0.08;

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />

      <ImageBackground
        source={images.homepage}
        resizeMode="cover"
        className="absolute inset-0"
      >
        {/* Overlay to darken background */}
        <View className="absolute inset-0 bg-black/60" />

       
        <View
          className="flex-1 justify-center bg-black/30"
          style={{ paddingHorizontal: horizontalPadding }}
        >
          
          <Text
            style={{ fontFamily: "Satoshi" }}
            className="text-white text-[26px] font-bold text-left mt-32"
          >
            TRACK YOUR CALLS
          </Text>

          
          <Text
            style={{ fontFamily: "Satoshi2" }}
            className="text-white italic text-[26px] text-center mt-2 "
          >
            to
          </Text>

          
          <Text
            style={{ fontFamily: "Satoshi2" }}
            className="text-white italic text-[60px] font-bold text-right mt-1"
          >
            SUCCESS
          </Text>
        </View>

        
        <View className="flex-1 justify-end items-center pb-16 bg-black/30">
          <Pressable
            onPress={() => router.push("/Profile")}
            className="px-6 py-4 rounded-full bg-black/40 w-[90%] border-neutral-900 border-2 justify-between flex-row items-center"
          >
            <Text className="text-white font-semibold text-lg">Get Started</Text>
            <View className="rounded-full w-10 h-10 bg-white justify-center items-center">
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
