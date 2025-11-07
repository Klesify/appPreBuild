import React from 'react'
import { Pressable, Text } from 'react-native'

interface ButtonProps {
  submit: () => void
  label: string
}

export default function Button({ submit, label }: ButtonProps) {
  return (
    <Pressable
      onPress={submit}
      className="w-[90%] items-center rounded-full border border-[#4BA3C3] bg-[#202020] py-4"
    >
      <Text className="text-[18px] text-white">{label}</Text>
    </Pressable>
  )
}
