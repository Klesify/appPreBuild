import { images } from "@/constants/images";
import Entypo from "@expo/vector-icons/Entypo";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View, useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Signup() {
  const router = useRouter();
  const { width } = useWindowDimensions(); 
  const insets = useSafeAreaInsets();

  type Mode = "company" | "user";
  const [mode, setMode] = useState<Mode | null>(null);

  // form fields: separate state per mode so company inputs don't leak into user flow
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    companyId: "",
    contactName: "",
    email: "",
    phone: "",
    password: "",
  });



  const [fontsLoaded] = useFonts({
    Satoshi: require("../../assets/fonts/LibreBaskerville-Regular.ttf"),
    Satoshi2: require("../../assets/fonts/LibreBaskerville-Italic.ttf"),
  });
  if (!fontsLoaded) return null;

 
  const horizontalPadding = width * 0.08;

  // Resolve asset size so we can compute a correct height for the image and center it
  const resolved = Image.resolveAssetSource(images.handPhoto || require("../../assets/image/handPhoto.png"));
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
          <View className="absolute top-[-40px] left-4 ">
            <Pressable
            onPress={() => router.back()}
            className="mt-14 bg-[#FFFFFF1A] rounded-full w-12 h-12 items-center justify-center self-start"
          >
            <Entypo name="chevron-left" size={24} color="white" />
          </Pressable>
          </View>
     </View>
     <View className="flex flex-col items-center justify-center gap-3 " style={{marginTop:-30}}>
        <Text className="" style={{fontFamily: 'Satoshi', color: 'white', fontSize: 25, fontWeight: 'bold'}}>
              Create Your Account
        </Text>
        <Text className="" style={{ color: 'white', fontSize: 18, }}>
             How would you like to sign up as?
        </Text>

        {/* Two buttons: Company / User */}
        <View className="flex-row w-[90%] justify-start mt-4">
          <Pressable
            onPress={() => setMode("company")}
            className={`flex-1 mr-2 py-4 rounded-full items-center border  ${mode === "company" ? "border-[#AC7F5E]" : ""}`}
          >
            <Text className={`${mode === "company" ? "text-white" : "text-[#D9D9D9]"} text-lg`}>Company</Text>
          </Pressable>

          <Pressable
            onPress={() => setMode("user")}
            className={`flex-1 ml-2 py-4 rounded-full items-center border ${mode === "user" ? "border-[#AC7F5E]" : ""}`}
          >
            <Text className={`${mode === "user" ? "text-white" : "text-[#D9D9D9]"} text-lg`}>User</Text>
          </Pressable>
        </View>
     </View>
  
      
    {/* Form area: show inputs depending on selection */}
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 30 }} keyboardShouldPersistTaps="handled">
        {mode ? (
          <View className="w-full items-center">
            {/* Company-specific extra fields */}
            {mode === "company" && (
              <>
                <View className="w-[90%]  border border-[#AC7F5E] rounded-full px-6 py-3 mb-4">
                  <Text style={{ color: 'white', marginBottom: 6, marginLeft: 4 }} className="text-sm">Company Name</Text>
                  <TextInput
                    value={companyForm.companyName}
                    onChangeText={(v) => setCompanyForm(s => ({ ...s, companyName: v }))}
                    placeholder="Company Name"
                    placeholderTextColor="white"
                    className="text-white w-full"
                  />
                </View>

                <View className="w-[90%] border border-[#AC7F5E] rounded-full px-6 py-3 mb-4">
                  <Text style={{ color: 'white', marginBottom: 6, marginLeft: 4 }} className="text-sm">Company ID</Text>
                  <TextInput
                    value={companyForm.companyId}
                    onChangeText={(v) => setCompanyForm(s => ({ ...s, companyId: v }))}
                    placeholder="Company ID"
                    placeholderTextColor="white"
                    className="text-white w-full"
                  />
                </View>
              </>
            )}

            {/* Common inputs (bound to the active mode's form state) */}
            <View className="w-[90%] border border-[#AC7F5E] rounded-full px-6 py-3 mb-4">
              <Text style={{ color: 'white', marginBottom: 6, marginLeft: 4 }} className="text-sm">{mode === "company" ? 'Contact Person Name' : 'Name'}</Text>
              <TextInput
                value={mode === 'company' ? companyForm.contactName : userForm.name}
                onChangeText={(v) => {
                  if (mode === 'company') setCompanyForm(s => ({ ...s, contactName: v }));
                  else setUserForm(s => ({ ...s, name: v }));
                }}
                placeholder={mode === "company" ? "Contact Person Name" : "Name"}
                placeholderTextColor="white"
                className="text-white w-full"
              />
            </View>

            <View className="w-[90%] border border-[#AC7F5E] rounded-full px-6 py-3 mb-4">
              <Text style={{ color: 'white', marginBottom: 6, marginLeft: 4 }} className="text-sm">Email</Text>
              <TextInput
                value={mode === 'company' ? companyForm.email : userForm.email}
                onChangeText={(v) => {
                  if (mode === 'company') setCompanyForm(s => ({ ...s, email: v }));
                  else setUserForm(s => ({ ...s, email: v }));
                }}
                placeholder="Email"
                placeholderTextColor="white"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-white w-full"
              />
            </View>

            {/* Phone (required for both modes) */}
            <View className="w-[90%] border border-[#AC7F5E] rounded-full px-6 py-3 mb-4">
              <Text style={{ color: 'white', marginBottom: 6, marginLeft: 4 }} className="text-sm">Phone</Text>
              <TextInput
                value={mode === 'company' ? companyForm.phone : userForm.phone}
                onChangeText={(v) => {
                  if (mode === 'company') setCompanyForm(s => ({ ...s, phone: v }));
                  else setUserForm(s => ({ ...s, phone: v }));
                }}
                placeholder="Phone (+countrycode)"
                placeholderTextColor="white"
                keyboardType="phone-pad"
                className="text-white w-full"
              />
            </View>

            <View className="w-[90%] border border-[#AC7F5E] rounded-full px-6 py-3 mb-6">
              <Text style={{ color: 'white', marginBottom: 6, marginLeft: 4 }} className="text-sm">Password</Text>
              <TextInput
                value={mode === 'company' ? companyForm.password : userForm.password}
                onChangeText={(v) => {
                  if (mode === 'company') setCompanyForm(s => ({ ...s, password: v }));
                  else setUserForm(s => ({ ...s, password: v }));
                }}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry
                autoCapitalize="none"
                className="text-white w-full"
              />
            </View>

            <Pressable
              onPress={() => {
                // pick the active form values
                const active = mode === 'company' ? companyForm : userForm;
                const emailOk = /^\S+@\S+\.\S+$/.test((active.email || "").trim());
                const phoneOk = /^\+?[0-9]{7,15}$/.test((active.phone || "").trim());

                if (mode === 'user') {
                  if (!userForm.name.trim() || !userForm.email.trim() || !userForm.password.trim() || !userForm.phone.trim()) {
                    alert("Please fill all required fields.");
                    return;
                  }
                } else {
                  // company
                  if (!companyForm.companyName.trim() || !companyForm.contactName.trim() || !companyForm.companyId.trim() || !companyForm.email.trim() || !companyForm.phone.trim() || !companyForm.password.trim()) {
                    alert("Please fill company name, contact person, company ID and other required fields.");
                    return;
                  }
                }

                if (!emailOk) {
                  alert("Please enter a valid email address.");
                  return;
                }
                if (!phoneOk) {
                  alert("Please enter a valid phone number (digits only, optionally starting with +, length 7-15).");
                  return;
                }

                // proceed (for now just navigate)
                router.push("/");
              }}
              className="w-[90%] items-center bg-[#202020] rounded-full py-4 border border-[#AC7F5E]"
            >
              <Text className="text-white text-[18px]">Create Account</Text>
            </Pressable>
          </View>
        ) : (
          <View className="w-full items-center mt-6">
            <Text style={{ color: 'white', opacity: 0.9 }}>Choose an option above to continue</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  
      
    </SafeAreaView>
    </LinearGradient>
  );
}
