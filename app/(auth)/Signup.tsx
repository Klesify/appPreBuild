import Entypo from '@expo/vector-icons/Entypo'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Lock, Mail, Phone, User } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../components/Button'
import PhoneField from '../components/PhoneField'
import TextField from '../components/TextField'

export default function Signup() {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
              onPress={() => router.back()}
              className="mt-14 h-12 w-12 items-center justify-center self-start rounded-full bg-[#FFFFFF1A]"
            >
              <Entypo name="chevron-left" size={24} color="white" />
            </Pressable>
          </View>
        </View>

        <View className="flex flex-col items-center justify-center gap-3 " style={{ marginTop: 60 }}>
          <Text
            style={{ fontFamily: 'Satoshi', color: 'white', fontSize: 25, fontWeight: 'bold' }}
          >
            Create Your Account
          </Text>
          <Text style={{ color: 'white', fontSize: 21 }}>Start your journey with us!</Text>
        </View>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 ,paddingTop: 20, paddingHorizontal: 20}}
          >
            
              <View className="w-full items-center">
                <TextField
                  value={userForm.firstName}
                  setValue={(v) => setUserForm((s) => ({ ...s, firstName: v }))}
                  placeholder={'First Name'}
                  placeholderTextColor={'white'}
                  className={'w-full text-white'}
                  icon={<User size={20} color="#AC7F5E" strokeWidth={1.5} />}
                />

                <TextField
                  value={userForm.lastName}
                  setValue={(v) => setUserForm((s) => ({ ...s, lastName: v }))}
                  placeholder={'Last Name'}
                  placeholderTextColor={'white'}
                  className={'w-full text-white'}
                  icon={<User size={20} color="#AC7F5E" strokeWidth={1.5} />}
                />

                <TextField
                  value={userForm.email}
                  setValue={(v) => setUserForm((s) => ({ ...s, email: v }))}
                  placeholder={'Email'}
                  placeholderTextColor={'white'}
                  className={'w-full text-white'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon={<Mail size={20} color="#AC7F5E" strokeWidth={1.5} />}
                />

                <PhoneField
                  phone={userForm.phone}
                placeholder={'Phone Number'}
                  placeholderTextColor={'white'}
                  className={'w-full text-white'}
                keyboardType="phone-pad"
                  icon={<Phone size={20} color="#AC7F5E" strokeWidth={1.5} />}
                  setPhone={(v) => setUserForm((s) => ({ ...s, phone: v }))}
                />

                <TextField
                  value={userForm.password}
                  setValue={(v) => setUserForm((s) => ({ ...s, password: v }))}
                  placeholder={'Password'}
                  placeholderTextColor={'white'}
                  className={'w-full text-white'}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  icon={<Lock size={20} color="#AC7F5E" strokeWidth={1.5} />}
                />

                <Button
                  submit={() => {
                    const emailOk = /^\S+@\S+\.\S+$/.test((userForm.email || '').trim())
                    const phoneOk = /^\+?[0-9]{7,15}$/.test((userForm.phone || '').trim())

                    if (
                      !userForm.firstName.trim() ||
                      !userForm.lastName.trim() ||
                      !userForm.email.trim() ||
                      !userForm.password.trim() ||
                      !userForm.phone.trim()
                    ) {
                      alert('Please fill all required fields.')
                      return
                    }
                    if (!emailOk) {
                      alert('Please enter a valid email address.')
                      return
                    }
                    if (!phoneOk) {
                      alert(
                        'Please enter a valid phone number (digits only, optionally starting with +, length 7-15).'
                      )
                      return
                    }
                    router.push('/(tabs)/Home')
                  }}
                  label={'Create Account'}
                />
              </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </LinearGradient>
  )
}
