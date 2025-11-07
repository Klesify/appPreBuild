import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import OutgoingCallCard from "../../app/components/OutgoingCallCard";
import { API_BASE_URL, AUTH_TOKEN } from "../../constants/config";

export default function OutgoingCall() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ phone?: string; callId?: string; api?: string; name?: string; ring?: string }>();
  const phone = params.phone ?? "+000 000 000";
  const callId = params.callId ?? undefined;
  const apiBaseUrl = (params.api as string | undefined) ?? API_BASE_URL;
  const contactName = params.name ?? undefined;
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
            <OutgoingCallCard
              phoneNumber={phone}
              callId={callId}
              apiBaseUrl={apiBaseUrl}
              authToken={AUTH_TOKEN}
              contactName={contactName}
              ringUri={ring}
              autoPlayRing={!!ring}
              ringLoop={true}
              ringVolume={1.0}
              sendRingFile={!!ring}
              onBack={() => router.back()}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
