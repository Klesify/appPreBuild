import React, { ReactNode } from 'react'

import { KeyboardTypeOptions, TextInput, View } from 'react-native'

interface TextFieldProps {
  value: string
  setValue: (text: string) => void
  placeholder: string
  placeholderTextColor: string
  keyboardType?: KeyboardTypeOptions
  className: string
  secureTextEntry?: boolean
  icon: ReactNode
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
}

export default function TextField({
  value,
  setValue,
  placeholder,
  placeholderTextColor,
  keyboardType,
  className,
  secureTextEntry = false,
  icon,
  autoCapitalize,
}: TextFieldProps) {
  return (
    <View className="mb-4 w-[90%] rounded-full border border-[#AC7F5E] px-6 py-3">
      <View className="flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full border border-[#AC7F5E]">
          {icon}
        </View>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          className={`flex-1 text-white ${className}`}
        />
      </View>
    </View>
  )
}
