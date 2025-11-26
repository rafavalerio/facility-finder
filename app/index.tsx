import { Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDebounceValue } from 'usehooks-ts'

import { Facility, fetchAmenities, fetchFacilities } from '../api/api'
import { Input } from '../components/Input'
import { Tag } from '../components/Tag'

const App = () => {
  const insets = useSafeAreaInsets()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [debouncedSearch] = useDebounceValue(search, 500)

  const searchFilter = search === '' ? '' : debouncedSearch

  const { data: amenities, isLoading: isLoadingAmenities } = useQuery<string[]>({
    queryKey: ['amenities'],
    queryFn: fetchAmenities,
  })

  const { data, isLoading, error } = useQuery<Facility[]>({
    queryKey: ['facilities'],
    queryFn: fetchFacilities,
  })

  const handleSelectAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities((prev) => prev.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities((prev) => [...prev, amenity])
    }
  }

  const filteredFacilities = useMemo(() => {
    return data?.filter(
      (facility) =>
        facility.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
        selectedAmenities.every((amenity) => facility.facilities.includes(amenity))
    )
  }, [searchFilter, data, selectedAmenities])

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
          onClear={() => setSearch('')}
        />
      </View>

      {isLoadingAmenities ? (
        <ActivityIndicator size="small" color="#999" />
      ) : (
        <ScrollView
          horizontal
          style={styles.amenitiesScroll}
          contentContainerStyle={styles.amenitiesContainer}
        >
          {amenities?.map((amenity, index) => (
            <Pressable key={`${amenity}-${index}`} onPress={() => handleSelectAmenity(amenity)}>
              <Tag text={amenity} selected={selectedAmenities.includes(amenity)} />
            </Pressable>
          ))}
        </ScrollView>
      )}

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
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No facilities found.</Text>
            <Pressable
              onPress={() => {
                setSelectedAmenities([])
                setSearch('')
              }}
            >
              <View style={styles.clearAllFilters}>
                <Ionicons name="close-circle" size={20} color="#bbb" />
                <Text>Clear all filters</Text>
              </View>
            </Pressable>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenitiesScroll: {
    flexGrow: 0,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  clearAllFilters: {
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
