import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack screenOptions={{ headerTintColor: '#00A1DC', headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="index" options={{ title: 'Facility Finder' }} />
      <Stack.Screen name="facilities/[facilityId]" options={{ title: 'Facility Details' }} />
    </Stack>
  )
}
