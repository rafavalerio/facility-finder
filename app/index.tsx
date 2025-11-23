import { Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Facility, fetchFacilities } from '../api/api'
import { Input } from '../components/Input'

export default function App() {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFacilities()
      setFacilities(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) =>
      facility.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, facilities])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#999" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
  emptyText: {
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
  listItem: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
