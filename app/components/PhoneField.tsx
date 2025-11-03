import { Phone } from 'lucide-react-native'
import React, { ReactNode } from 'react'
import { KeyboardTypeOptions, TextInput, View } from 'react-native'

type PhoneFieldProps = {
  phone: string
  setPhone: (value: string) => void
  placeholder?: string
  placeholderTextColor?: string
  className?: string
  icon?: ReactNode
  keyboardType?: KeyboardTypeOptions
  maxLength?: number
}

export default function PhoneField({
  phone,
  setPhone,
  placeholder = 'Phone number',
  placeholderTextColor = '#aaa',
  className = 'flex-1 text-white',
  icon,
  keyboardType = 'phone-pad',
  maxLength = 15,
}: PhoneFieldProps) {
  return (
    <View className="mb-4 w-[90%] rounded-full border border-[#AC7F5E] px-6 py-3">
      <View className="flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full border border-[#AC7F5E]">
          {icon ?? <Phone size={20} stroke="#AC7F5E" strokeWidth={1.5} />}
        </View>
        <TextInput
          value={phone}
          onChangeText={(t) => setPhone(t)}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          returnKeyType="done"
          maxLength={maxLength}
          className={className}
        />
      </View>
    </View>
  )
}
