import { Phone } from 'lucide-react-native'
import React from 'react'
import { View } from 'react-native'
import PhoneInput from 'react-native-phone-number-input'

type PhoneFieldProps = {
  phone: string
  setPhone: (value: string) => void
}

export default function PhoneField({ phone, setPhone }: PhoneFieldProps) {
  return (
    <View className="mb-4 w-[90%] flex-row items-center rounded-full border border-[#AC7F5E] px-4 py-2">
      {/* Left icon bubble */}
      <View className="mr-3 h-10 w-10 items-center justify-center rounded-full border border-[#AC7F5E]">
        <Phone size={20} color="#AC7F5E" strokeWidth={1.5} />
      </View>
      <PhoneInput
        defaultCode="RO"
        layout="second"
        value={phone}
        onChangeText={setPhone}
        withShadow={false}
        // make the component fill the row next to the icon
        containerStyle={{
          backgroundColor: 'transparent',
          borderRadius: 999,
          flex: 1,
          height: 48, // align nicely with the icon circle
        }}
        textContainerStyle={{
          backgroundColor: 'transparent',
          borderRadius: 999,
          paddingVertical: 0,
          paddingHorizontal: 0, // remove inner padding so text aligns with border
        }}
        textInputProps={{
          placeholder: 'Phone number',
          placeholderTextColor: '#aaa',
          selectionColor: '#AC7F5E',
          returnKeyType: 'done',
        }}
        textInputStyle={{
          color: '#fff',
          fontSize: 16,
          paddingVertical: 0,
        }}
        codeTextStyle={{
          color: '#fff',
          fontSize: 16,
          marginLeft: 4,
          marginRight: 4, // small gap between code and number
        }}
        flagButtonStyle={{
          backgroundColor: 'transparent',
          paddingHorizontal: 0,
          marginLeft: -6, // tuck flag closer to border for tighter layout
          marginRight: 6,
        }}
        // Optional: dark modal for country picker
        countryPickerProps={{
          withFilter: true,
          withFlag: true,
          withCallingCode: true,
          withAlphaFilter: false,
          withEmoji: true,
          theme: {
            backgroundColor: '#1c1c1c',
            onBackgroundTextColor: '#fff',
            filterPlaceholderTextColor: '#aaa',
          },
        }}
      />
    </View>
  )
}
