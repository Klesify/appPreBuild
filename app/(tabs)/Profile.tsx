import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Checkbox from "expo-checkbox";
import { Stack, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, ImageBackground, Pressable, Text, TextInput, View } from "react-native";
import { images } from "../../constants/images";

type Mode = "signup" | "login";

const Profile = () => {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signup");

  // form state
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const isSignup = mode === "signup";
  const submitLabel = useMemo(() => (isSignup ? "Sign Up" : "Login"), [isSignup]);

  const onSubmit = () => {
    // very light validation (keep it simple)
    if (isSignup) {
      if (!name.trim() || !email.trim() || !password.trim()) {
        Alert.alert("Missing info", "Please fill Name, Email and Password.");
        return;
      }
      if (!checked) {
        Alert.alert("Agreement", "Please agree to the terms to continue.");
        return;
      }
    } else {
      if (!email.trim() || !password.trim()) {
        Alert.alert("Missing info", "Please fill Email and Password.");
        return;
      }
    }

    // TODO: call your API here
    // For now just navigate somewhere. Change the route to your target page.
    router.push("/"); // e.g. back to landing or to "/Home"
  };

  return (
    <ImageBackground source={images.home} resizeMode="cover" className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Dark overlay to keep text readable */}
      <View className="absolute inset-0 bg-black/60" />

      <View className="flex-1">
        {/* Top content */}
        <View className="px-8">
          <Pressable
            onPress={() => router.back()}
            className="mt-14 bg-[#FFFFFF1A] rounded-full w-12 h-12 items-center justify-center self-start"
          >
            <Entypo name="chevron-left" size={24} color="white" />
          </Pressable>

          <View className="px-4 items-center gap-2 mt-8">
            <Text className="text-white text-5xl font-bold text-center">Create your</Text>
            <Text className="text-white text-5xl font-bold text-center">Klesify Account!</Text>
            <Text className="text-white/90 text-lg text-center mt-3">
              Sign up to start tracking your calls and achieving your goals with Klesify!
            </Text>
          </View>
        </View>

        
        <View className="flex-1 bg-[#232223] rounded-t-3xl mt-10">
          <View className="flex w-full items-center">
            {/* segmented control (now pressable, same look) */}
            <View className="flex-row justify-between px-8 mt-6 bg-black w-[90%] py-3 rounded-full gap-3">
              <Pressable
                onPress={() => setMode("signup")}
                className={`w-1/2 rounded-full py-4 items-center ${
                  isSignup ? "bg-[#AC7F5E]" : "bg-black"
                }`}
              >
                <Text className={`text-[18px] ${isSignup ? "text-white" : "text-[#D9D9D9]"}`}>
                  SignUp
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setMode("login")}
                className={`w-1/2 rounded-full py-4 items-center ${
                  !isSignup ? "bg-[#AC7F5E]" : "bg-black"
                }`}
              >
                <Text className={`text-[18px] ${!isSignup ? "text-white" : "text-[#D9D9D9]"}`}>
                  Login
                </Text>
              </Pressable>
            </View>

            
            <View className="w-full items-center mt-6">
              <View className="flex flex-col gap-4 w-full items-center">
                {isSignup && (
                  <View className="flex-row gap-2 items-center justify-start bg-[#AC7F5E] rounded-full w-[90%] px-6 py-6">
                    <Ionicons name="person" size={24} color="black" />
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      placeholder="Name"
                      placeholderTextColor="#D9D9D9"
                      className="flex-1 text-[18px] text-white"
                      autoCapitalize="words"
                      returnKeyType="next"
                    />
                    
                  </View>
                  
                )}
                
                <View className="flex-row gap-2 items-center justify-start bg-[#AC7F5E] rounded-full w-[90%] px-6 py-6">
                  <MaterialCommunityIcons name="email" size={24} color="black" />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor="#D9D9D9"
                    className="flex-1 text-[18px] text-white"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                </View>

                <View className="flex-row gap-2 items-center justify-start bg-[#AC7F5E] rounded-full w-[90%] px-6 py-6">
                  <FontAwesome5 name="key" size={24} color="black" />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="#D9D9D9"
                    className="flex-1 text-[18px] text-white"
                    secureTextEntry
                    autoCapitalize="none"
                    returnKeyType="done"
                  />
                </View>

                {isSignup && (
                  <View className="flex-row items-center justify-start w-[90%] gap-3 mt-2">
                    <Checkbox
                      value={checked}
                      onValueChange={setChecked}
                      color={checked ? "#0CBA65" : undefined}
                      style={{ width: 22, height: 22, borderRadius: 6 }}
                    />
                    <Text className="text-white">
                      <Text className="underline">
                        I certify that I am 18 years or older, and agree to all user agreement and
                        privacy policy
                      </Text>
                    </Text>
                  </View>
                )}
              </View>

              <Pressable
                onPress={onSubmit}
                className="w-[90%] items-center mt-10 bg-[#AC7F5E] rounded-full py-4  "
              >
                <Text className="text-[#D9D9D9] text-2xl">{submitLabel}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Profile;
