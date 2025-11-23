import { Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Facility, fetchFacilities } from '../api/api'
import { Input } from '../components/Input'

const App = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useQuery<Facility[]>({
    queryKey: ['facilities'],
    queryFn: fetchFacilities,
  })

  const filteredFacilities = useMemo(() => {
    return data?.filter((facility) => facility.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, data])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text>Error: {error.message}</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          icon={<Ionicons name="search-outline" size={20} color="#bbb" />}
        />
      </View>
      <FlashList
        data={filteredFacilities}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.navigate(`/facilities/${item.id}`)}
            style={styles.listItem}
          >
            <Text>{item.name}</Text>
            <Text style={styles.listItemAddress}>{item.address}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.container}>
            <Text style={styles.emptyText}>No facilities found.</Text>
          </View>
        }
      />
      <StatusBar style="auto" />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  emptyText: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
  listItem: {
    padding: 14,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#eee',
  },
  listItemAddress: {
    fontSize: 12,
    color: '#777',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 24,
    padding: 10,
    paddingHorizontal: 16,
  },
})
