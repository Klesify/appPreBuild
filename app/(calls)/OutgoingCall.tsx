import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import OutgoingCallCard from "../../app/components/OutgoingCallCard";

export default function OutgoingCall() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ phone?: string; callId?: string; api?: string; name?: string }>();
  const phone = params.phone ?? "+000 000 000";
  const callId = params.callId ?? undefined;
  const apiBaseUrl = params.api ?? undefined;
  const contactName = params.name ?? undefined;

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
              contactName={contactName}
              onBack={() => router.back()}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
