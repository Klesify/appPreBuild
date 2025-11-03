import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BottomNav() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const pillWidth = Math.min(width - 64, 380);

  return (
    <View style={[styles.container, { bottom: insets.bottom + 16 }]}> 
      <View style={[styles.pill, { width: pillWidth }]}>
        <Pressable onPress={() => router.push('/' as any)} style={styles.iconWrap}>
          <Entypo name="home" size={22} color="white" />
        </Pressable>

        <Pressable onPress={() => router.push('/settings' as any)} style={styles.iconWrap}>
          <Entypo name="cog" size={22} color="white" />
        </Pressable>
      </View>

      {/* large circular affordance on the right, overlapping the pill like the design */}
      <Pressable onPress={() => router.push('/settings' as any)} style={[styles.fab, { right: 28, bottom: insets.bottom + 24 }]}>
        <Entypo name="chevron-right" size={28} color="#111" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 50,
  },
  pill: {
    height: 64,
    backgroundColor: '#1f1f1f',
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 18,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // subtle border to match mock
    borderWidth: 2,
    borderColor: '#e6e6e6',
    // lift
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
});
