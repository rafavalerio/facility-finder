import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

const queryClient = new QueryClient()

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerTintColor: '#00A1DC', headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen name="index" options={{ title: 'Facility Finder' }} />
        <Stack.Screen name="facilities/[facilityId]" options={{ title: 'Facility Details' }} />
      </Stack>
    </QueryClientProvider>
  )
}

export default Layout
