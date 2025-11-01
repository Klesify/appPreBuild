import { images } from '@/constants/images'
import Entypo from '@expo/vector-icons/Entypo'
import { useFonts } from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { BriefcaseBusiness, IdCard, Lock, Mail, User } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../components/Button'
import PhoneField from '../components/PhoneField'
import TextField from '../components/TextField'

export default function Signup() {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  type Mode = 'company' | 'user'
  const [mode, setMode] = useState<Mode | null>(null)

  // form fields: separate state per mode so company inputs don't leak into user flow
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  })

  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    companyId: '',
    contactFirstName: '',
    contactLastName: '',
    email: '',
    phone: '',
    password: '',
  })

  const [country, setCountry] = useState('')

  const [fontsLoaded] = useFonts({
    Satoshi: require('../../assets/fonts/LibreBaskerville-Regular.ttf'),
    Satoshi2: require('../../assets/fonts/LibreBaskerville-Italic.ttf'),
  })
  if (!fontsLoaded) return null

  const horizontalPadding = width * 0.08

  // Resolve asset size so we can compute a correct height for the image and center it
  const resolved = Image.resolveAssetSource(
    images.handPhoto || require('../../assets/image/handPhoto.png')
  )
  const imgAspect = resolved?.width && resolved?.height ? resolved.width / resolved.height : 1
  const imgWidth = width * 0.7
  const imgHeight = imgWidth / imgAspect

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
        <View
          className="flex flex-col items-center justify-center gap-3 "
          style={{ marginTop: -30 }}
        >
          <Text
            className=""
            style={{ fontFamily: 'Satoshi', color: 'white', fontSize: 25, fontWeight: 'bold' }}
          >
            Create Your Account
          </Text>
          <Text className="" style={{ color: 'white', fontSize: 18 }}>
            How would you like to sign up as?
          </Text>

          {/* Two buttons: Company / User */}
          <View className="mt-4 w-[90%] flex-row justify-start">
            <Pressable
              onPress={() => setMode('company')}
              className={`mr-2 flex-1 items-center rounded-full border py-4  ${mode === 'company' ? 'border-[#AC7F5E]' : ''}`}
            >
              <Text className={`${mode === 'company' ? 'text-white' : 'text-[#D9D9D9]'} text-lg`}>
                Company
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setMode('user')}
              className={`ml-2 flex-1 items-center rounded-full border py-4 ${mode === 'user' ? 'border-[#AC7F5E]' : ''}`}
            >
              <Text className={`${mode === 'user' ? 'text-white' : 'text-[#D9D9D9]'} text-lg`}>
                User
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Form area: show inputs depending on selection */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 30 }}
            keyboardShouldPersistTaps="handled"
          >
            {mode ? (
              <View className="w-full items-center">
                {/* Company-specific extra fields */}
                {mode === 'company' && (
                  <>
                    <TextField
                      value={companyForm.companyName}
                      setValue={(companyName) => setCompanyForm({ ...companyForm, companyName })}
                      placeholder={'Company Name'}
                      placeholderTextColor={'white'}
                      className={'w-full text-white'}
                      icon={<BriefcaseBusiness size={20} color="#AC7F5E" strokeWidth={1.5} />}
                    />
                    <TextField
                      value={companyForm.companyId}
                      setValue={(companyId) => setCompanyForm({ ...companyForm, companyId })}
                      placeholder={'Company ID'}
                      placeholderTextColor={'white'}
                      className={'w-full text-white'}
                      icon={<IdCard size={20} color="#AC7F5E" strokeWidth={1.5} />}
                    />
                  </>
                )}
                {/* Common inputs (bound to the active mode's form state) */}
                <TextField
                  value={mode === 'company' ? companyForm.contactFirstName : userForm.firstName}
                  setValue={(value) => {
                    if (mode === 'company')
                      setCompanyForm((s) => ({ ...s, contactFirstName: value }))
                    else setUserForm((s) => ({ ...s, firstName: value }))
                  }}
                  placeholder={mode === 'company' ? 'Contact First Name' : 'First Name'}
                  placeholderTextColor={'white'}
                  className={'w-full text-white'}
                  icon={<User size={20} color="#AC7F5E" strokeWidth={1.5} />}
                />
                <TextField
                  value={mode === 'company' ? companyForm.contactLastName : userForm.lastName}
                  setValue={(value) => {
                    if (mode === 'company')
                      setCompanyForm((s) => ({ ...s, contactLastName: value }))
                    else setUserForm((s) => ({ ...s, lastName: value }))
                  }}
                  placeholder={mode === 'company' ? 'Contact Last Name' : 'Last Name'}
                  placeholderTextColor={'white'}
                  className={'w-full text-white'}
                  icon={<User size={20} color="#AC7F5E" strokeWidth={1.5} />}
                />
                <TextField
                  value={mode === 'company' ? companyForm.email : userForm.email}
                  setValue={(value) => {
                    if (mode === 'company') setCompanyForm((s) => ({ ...s, email: value }))
                    else setUserForm((s) => ({ ...s, email: value }))
                  }}
                  placeholder={'Email'}
                  placeholderTextColor={'white'}
                  className={'w-full text-white'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon={<Mail size={20} color="#AC7F5E" strokeWidth={1.5} />}
                />
                <PhoneField
                  phone={mode === 'company' ? companyForm.phone : userForm.phone}
                  setPhone={(value) => {
                    if (mode === 'company') setCompanyForm((s) => ({ ...s, phone: value }))
                    else setUserForm((s) => ({ ...s, phone: value }))
                  }}
                />
                <TextField
                  value={mode === 'company' ? companyForm.password : userForm.password}
                  setValue={(v) => {
                    if (mode === 'company') setCompanyForm((s) => ({ ...s, password: v }))
                    else setUserForm((s) => ({ ...s, password: v }))
                  }}
                  placeholder={'Password'}
                  placeholderTextColor={'white'}
                  className={'w-full text-white'}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  icon={<Lock size={20} color="#AC7F5E" strokeWidth={1.5} />}
                />
                <Button
                  submit={() => {
                    // pick the active form values
                    const active = mode === 'company' ? companyForm : userForm
                    const emailOk = /^\S+@\S+\.\S+$/.test((active.email || '').trim())
                    const phoneOk = /^\+?[0-9]{7,15}$/.test((active.phone || '').trim())

                    if (mode === 'user') {
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
                    } else {
                      // company
                      if (
                        !companyForm.companyName.trim() ||
                        !companyForm.contactFirstName.trim() ||
                        !companyForm.contactLastName.trim() ||
                        !companyForm.companyId.trim() ||
                        !companyForm.email.trim() ||
                        !companyForm.phone.trim() ||
                        !companyForm.password.trim()
                      ) {
                        alert(
                          'Please fill company name, contact person, company ID and other required fields.'
                        )
                        return
                      }
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

                    // proceed (for now just navigate)
                    router.push('/')
                  }}
                  label={'Create Account'}
                />
              </View>
            ) : (
              <View className="mt-6 w-full items-center">
                <Text style={{ color: 'white', opacity: 0.9 }}>
                  Choose an option above to continue
                </Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  )
}
