import Entypo from '@expo/vector-icons/Entypo'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export interface OutgoingCallCardProps {
  phoneNumber: string
  callId?: string
  contactName?: string
  apiBaseUrl?: string
  authToken?: string
  // Optional: attach ring audio file on request
  sendRingFile?: boolean
  ringFieldName?: string // defaults to 'ring'
  onHangup?: () => Promise<void> | void
  onDecline?: () => Promise<void> | void
  onAfterAction?: () => void
  onBack?: () => void
  onHangupPressIn?: () => void
  onHangupPressOut?: () => void
  onHangupLongPress?: () => void
  ringUri?: string
  autoPlayRing?: boolean
  ringLoop?: boolean
  ringVolume?: number
  scamApiUrl?: string // URL to fetch scam score
}

const OutgoingCallCard: React.FC<OutgoingCallCardProps> = ({
  phoneNumber,
  callId,
  contactName,
  apiBaseUrl,
  authToken,
  sendRingFile = false,
  ringFieldName,
  onHangup,
  onDecline,
  onAfterAction,
  onBack,
  onHangupPressIn,
  onHangupPressOut,
  onHangupLongPress,
  ringUri,
  autoPlayRing = false,
  ringLoop = false,
  ringVolume = 1.0,
  scamApiUrl = 'http://localhost:8000/detect-fraud',
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [elapsed, setElapsed] = useState<number>(0)
  const [scamScore, setScamScore] = useState<number | null>(null)
  const [riskLevel, setRiskLevel] = useState<string | null>(null)
  const [fetchingScore, setFetchingScore] = useState<boolean>(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const soundRef = useRef<Audio.Sound | null>(null)

  // Fetch scam score from backend
  useEffect(() => {
    const fetchScamScore = async () => {
      setFetchingScore(true)
      try {
        // Get the audio file from assets
        const audioUri = require('../../assets/audios/Marcel_Mondialu_scam.wav')
        
        // Fetch the audio file
        const audioResponse = await fetch(audioUri)
        const audioBlob = await audioResponse.blob()
        
        // Create FormData
        const formData = new FormData()
        formData.append('phoneNumber', phoneNumber)
        formData.append('audio', audioBlob, 'Marcel_Mondialu_scam.wav')
        
        // Send POST request
        const response = await fetch(scamApiUrl, {
          method: 'POST',
          body: formData,
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.response) {
            setScamScore(data.response.overall_scam_score)
            setRiskLevel(data.response.risk_level)
          }
        }
      } catch (err) {
        console.error('Failed to fetch scam score:', err)
      } finally {
        setFetchingScore(false)
      }
    }
    fetchScamScore()
  }, [scamApiUrl, phoneNumber])

  useEffect(() => {
    const start = Date.now()
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (soundRef.current) {
        soundRef.current.stopAsync().catch(() => {})
        soundRef.current.unloadAsync().catch(() => {})
        soundRef.current = null
      }
    }
  }, [])

  // Auto-play ring audio
  useEffect(() => {
    let mounted = true
    const setup = async () => {
      if (!autoPlayRing || !ringUri) return
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: false,
        })
        const { sound } = await Audio.Sound.createAsync(
          { uri: ringUri },
          { volume: ringVolume, isLooping: ringLoop }
        )
        if (!mounted) {
          await sound.unloadAsync()
          return
        }
        soundRef.current = sound
        await sound.playAsync()
      } catch {
        // Silently ignore audio setup failures
      }
    }
    setup()
    return () => { mounted = false }
  }, [autoPlayRing, ringUri, ringLoop, ringVolume])

  const formatTime = (total: number) => {
    const m = Math.floor(total / 60)
    const s = total % 60
    const mm = String(m).padStart(2, '0')
    const ss = String(s).padStart(2, '0')
    return `${mm}:${ss}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#d7210d' // High risk - red
    if (score >= 40) return '#ff9800' // Medium risk - orange
    return '#4caf50' // Low risk - green
  }

  const runHangup = useCallback(async () => {
    if (loading) return
    setLoading(true)
    setError(null)
    try {
      // Stop the timer immediately on hangup attempt
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      if (soundRef.current) {
        await soundRef.current.stopAsync().catch(() => {})
        await soundRef.current.unloadAsync().catch(() => {})
        soundRef.current = null
      }

      if (onHangup) {
        await onHangup()
      } else if (onDecline) {
       
        await onDecline()
      } else if (apiBaseUrl && callId) {
        // callId already conveyed in URL; append phone as query param if available
        const phoneParam = encodeURIComponent((phoneNumber || '').trim())
        const url = `${apiBaseUrl}/calls/${callId}/end${phoneParam ? `?phone=${phoneParam}` : ''}`
        const headers: Record<string, string> = {
          'Accept': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        }
        let bodyToSend: BodyInit | undefined
        if (sendRingFile && ringUri) {
          try {
            const fileRes = await fetch(ringUri)
            const blob = await fileRes.blob()
            // Convert blob -> base64 for JSON transport as { phoneNumber, blobData }
            const arrayBuffer = await blob.arrayBuffer()
            const bytes = new Uint8Array(arrayBuffer)
            let binary = ''
            for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
            // @ts-ignore btoa may exist in React Native Hermes; fallback to Buffer if polyfilled
            let base64: string
            try { base64 = btoa(binary) } catch { base64 = Buffer.from(binary, 'binary').toString('base64') }
            const payload = {
              phoneNumber: (phoneNumber || '').trim(),
              blobData: base64,
              mime: 'audio/wav',
              fileName: 'ring.wav',
            }
            headers['Content-Type'] = 'application/json'
            bodyToSend = JSON.stringify(payload)
          } catch {
            throw new Error('Failed to encode WAV as base64')
          }
        } else {
          // No file -> still send JSON with phoneNumber (optional) or empty
            headers['Content-Type'] = 'application/json'
            bodyToSend = JSON.stringify({ phoneNumber: (phoneNumber || '').trim() })
        }
        const r = await fetch(url, { method: 'POST', headers, body: bodyToSend })
        if (!r.ok) throw new Error(`End call failed (${r.status})`)
      } else {
        // No backend handler/context provided; treat as a local hangup and navigate back
        onAfterAction?.()
        return
      }
      onAfterAction?.()
    } catch (e: any) {
      setError(e?.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [loading, onHangup, onDecline, apiBaseUrl, callId, authToken, sendRingFile, ringUri, phoneNumber, onAfterAction])

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
      {contactName && (
        <Text className="text-white text-[38px] font-bold -top-12">{contactName}</Text>
      )}
      <Text className="text-white text-[30px] font-regular -top-10">{phoneNumber}</Text>
      
      {/* Scam Score Display */}
      {fetchingScore ? (
        <View className="-top-9">
          <ActivityIndicator color="#fff" size="small" />
        </View>
      ) : scamScore !== null ? (
        <View className="items-center -top-9">
          <Text 
            className="text-[20px] font-bold" 
            style={{ color: getScoreColor(scamScore) }}
          >
            Scam Score: {scamScore}%
          </Text>
          {riskLevel && (
            <Text 
              className="text-[16px] font-semibold" 
              style={{ color: getScoreColor(scamScore) }}
            >
              {riskLevel} RISK
            </Text>
          )}
        </View>
      ) : null}
      
      <Text className="text-white text-[18px] font-medium -top-8">{formatTime(elapsed)}</Text>
      <View className="flex-row justify-center mt-[370px]">
        <Pressable
          disabled={!!loading}
          onPress={runHangup}
          onPressIn={onHangupPressIn}
          onPressOut={onHangupPressOut}
          onLongPress={onHangupLongPress}
          className={`h-[80px] w-[80px] rounded-full bg-[#d7210d] items-center justify-center  ${
            loading ? 'opacity-60' : ''
          }`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Entypo name="phone" size={40} color="#fff" style={{ transform: [{ rotate: '225deg' }] }} />
          )}
        </Pressable>
      </View>
      {error && <Text className="mt-4  text-[14px] text-[#ff6b6b]">{error}</Text>}
      </View>
    </SafeAreaView>
  )
}

export default OutgoingCallCard
