import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
export default function Profile() {
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
        <View style={{ position: 'absolute', top: insets.top + 120, left: 0, right: 0, bottom: 0 }}>
            <View className="absolute inset-0 flex items-center flex-col gap-4">
             <View className="mt-6">
            <Text className="" style={{ color: 'white', fontSize: 19, fontWeight: '400' }}>
                Start your journey with us!
            </Text>
            </View>
       </View>
      </View>
    </SafeAreaView>
    </LinearGradient>
  );
}
