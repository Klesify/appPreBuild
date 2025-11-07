import Entypo from '@expo/vector-icons/Entypo'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Lock, Mail } from 'lucide-react-native'
import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../components/Button'
import TextField from '../components/TextField'
export default function Login() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [fontsLoaded] = useFonts({
    Satoshi: require('../../assets/fonts/LibreBaskerville-Regular.ttf'),
    Satoshi2: require('../../assets/fonts/LibreBaskerville-Italic.ttf'),
  })
  if (!fontsLoaded) return null

  return (
    <LinearGradient colors={['#0b0b0b', '#262626', '#3a3a3a']} style={{ flex: 1 }}>
      <StatusBar style="light" translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
    <Stack.Screen options={{ headerShown: false }} />
        <View style={{ paddingTop: insets.top + 25 }}>
          <View className="absolute left-4 top-[-40px] ">
            <Pressable
              onPress={() => router.replace('/Choose')}
              className="mt-14 h-12 w-12 items-center justify-center self-start rounded-full bg-[#FFFFFF1A]"
            >
              <Entypo name="chevron-left" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View
          className="flex flex-col items-center justify-center gap-3  "
          style={{ marginTop: 150 }}
        >
          <Text
            style={{ fontFamily: 'Satoshi', color: 'white', fontSize: 25, fontWeight: 'bold' }}
          >
            Welcome back
          </Text>
          <Text className="" style={{ color: 'white', fontSize: 21}}>
            You have been missed!
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
            <View className="w-full items-center pt-7 px-[20px]">
              <TextField
                value={form.email}
                setValue={(email) => setForm({ ...form, email })}
                placeholder={'Email'}
                placeholderTextColor={'white'}
                keyboardType={'email-address'}
                className={'w-full text-white'}
                autoCapitalize="none"
                icon={<Mail size={20} color="#4BA3C3" strokeWidth={1.5} />}
              />
              <TextField
                value={form.password}
                setValue={(password) => setForm({ ...form, password })}
                placeholder={'Password'}
                placeholderTextColor={'white'}
                className={'w-full text-white'}
                secureTextEntry={true}
                icon={<Lock size={20} color="#4BA3C3" strokeWidth={1.5} />}
              />
              <Button
                submit={() => {
                  {
                    // pick the active form values
                    const active = form
                    const emailOk = /^\S+@\S+\.\S+$/.test((active.email || '').trim())

                    if (!form.email.trim() || !form.password.trim()) {
                      alert('Please fill all required fields.')
                      return
                    }

                    if (!emailOk) {
                      alert('Please enter a valid email address.')
                      return
                    }
                    router.push('/(tabs)/Home')
                  }
                }}
                label={'Log In'}
              />
            </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </LinearGradient>
  )
}
