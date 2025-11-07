import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export interface IncomingCallCardProps {
  phoneNumber: string
  callId?: string
  callerName?: string
  apiBaseUrl?: string
  authToken?: string
  onAccept?: () => Promise<void> | void
  onDecline?: () => Promise<void> | void
  onAfterAction?: () => void
  onBack?: () => void
  // Pre-listening hooks for button interactions
  onAcceptPressIn?: () => void
  onAcceptPressOut?: () => void
  onAcceptLongPress?: () => void
  onDeclinePressIn?: () => void
  onDeclinePressOut?: () => void
  onDeclineLongPress?: () => void
}

const IncomingCallCard: React.FC<IncomingCallCardProps> = ({
  phoneNumber,
  callId,
  callerName,
  apiBaseUrl,
  authToken,
  onAccept,
  onDecline,
  onAfterAction,
  onBack,
  onAcceptPressIn,
  onAcceptPressOut,
  onAcceptLongPress,
  onDeclinePressIn,
  onDeclinePressOut,
  onDeclineLongPress,
}) => {
  const [loading, setLoading] = useState<'accept' | 'decline' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runRequest = useCallback(
    async (type: 'accept' | 'decline') => {
      if (loading) return
      setLoading(type)
      setError(null)
      try {
        if (type === 'accept') {
          if (onAccept) {
            await onAccept()
          } else if (apiBaseUrl && callId) {
            // callId is in URL; omit JSON body
            const r = await fetch(`${apiBaseUrl}/calls/${callId}/accept`, {
              method: 'POST',
              headers: {
                ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
              },
            })
            if (!r.ok) throw new Error(`Accept failed (${r.status})`)
          } else {
            throw new Error('No onAccept handler or apiBaseUrl/callId provided')
          }
        } else {
          if (onDecline) {
            await onDecline()
          } else if (apiBaseUrl && callId) {
            const r = await fetch(`${apiBaseUrl}/calls/${callId}/decline`, {
              method: 'POST',
              headers: {
                ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
              },
            })
            if (!r.ok) throw new Error(`Decline failed (${r.status})`)
          } else {
            throw new Error('No onDecline handler or apiBaseUrl/callId provided')
          }
        }
        onAfterAction?.()
      } catch (e: any) {
        setError(e?.message || 'Unknown error')
      } finally {
        setLoading(null)
      }
    },
    [loading, onAccept, onDecline, apiBaseUrl, callId, authToken, onAfterAction]
  )

  return (
    <SafeAreaView edges={['top', 'left', 'right', 'bottom']} className="w-full ">
      <View className="items-center gap-6">
      {onBack && (
        <Pressable
          onPress={onBack}
          className="absolute left-1 -top-[130px] h-12 w-12 rounded-full bg-white/10 items-center justify-center"
        >
          <Entypo name="chevron-left" size={24} color="white" />
        </Pressable>
      )}
      <Text className="text-white text-[30px] font-regular -top-10">{phoneNumber}</Text>
      {callerName && <Text className="text-white text-[18px] font-medium">{callerName}</Text>}
      <View className="flex-row gap-36 mt-[460px]">
        <Pressable
          disabled={!!loading}
          onPress={() => runRequest('decline')}
          onPressIn={onDeclinePressIn}
          onPressOut={onDeclinePressOut}
          onLongPress={onDeclineLongPress}
          className={`h-[80px] w-[80px] rounded-full bg-[#d7210d] items-center justify-center ${
            loading === 'decline' ? 'opacity-60' : ''
          }`}
        >
          {loading === 'decline' ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Entypo name="phone" size={40} color="#fff" style={{ transform: [{ rotate: '225deg' }] }} />
          )}
        </Pressable>
        <Pressable
          disabled={!!loading}
          onPress={() => runRequest('accept')}
          onPressIn={onAcceptPressIn}
          onPressOut={onAcceptPressOut}
          onLongPress={onAcceptLongPress}
          className={`h-[80px] w-[80px] rounded-full bg-[#129e27] items-center justify-center ${
            loading === 'accept' ? 'opacity-60' : ''
          }`}
        >
          {loading === 'accept' ? (
            <ActivityIndicator color="white" />
          ) : (
            <Feather name="phone" size={40} color="#fff" />
          )}
        </Pressable>
      </View>
      {error && <Text className="mt-4 text-[14px] text-[#ff6b6b]">{error}</Text>}
      </View>
    </SafeAreaView>
  )
}

export default IncomingCallCard
