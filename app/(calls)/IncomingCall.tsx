import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import CallCard from "../../app/components/IncomingCallCard";

export default function IncomingCall() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ phone?: string; callId?: string; api?: string; ring?: string }>();
  const phone = params.phone ?? "+000 000 000";
  const callId = params.callId ?? undefined;
  const apiBaseUrl = params.api ?? undefined;
  const ring = params.ring ?? undefined;

  const [fontsLoaded] = useFonts({
    Satoshi: require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
    Satoshi2: require("../../assets/fonts/LibreBaskerville-Italic.ttf"),
  });
  if (!fontsLoaded) return null;
  return (
    <LinearGradient colors={["#0b0b0b", "#0b0b0b", "#0b0b0b"]} style={{ flex: 1 }}>
      <StatusBar style="light" translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View
          style={{ position: "absolute", top: insets.top + 120, left: 0, right: 0, bottom: 0 }}
        >
          <View className="absolute inset-0 items-center">
            <CallCard
              phoneNumber={phone}
              callId={callId}
              apiBaseUrl={apiBaseUrl}
              onBack={() => router.back()}
              onAccept={async () => {
                // Optionally call backend accept here, then navigate to OutgoingCall
                router.replace({ pathname: '/(calls)/OutgoingCall', params: { phone, api: apiBaseUrl, ring } })
              }}
              onDecline={async () => {
                // Optionally call backend decline here, then go Home
                router.replace('/(tabs)/Home')
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
