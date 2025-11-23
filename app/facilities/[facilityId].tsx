import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { Facility, fetchFacility } from '../../api/api'
import { Tag } from '../../components/Tag'

const FacilityDetails = () => {
  const { facilityId } = useLocalSearchParams()

  const { data, isLoading } = useQuery<Facility>({
    queryKey: ['facility', facilityId],
    queryFn: () => fetchFacility(facilityId as string),
  })

  if (isLoading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  if (!data) {
    return <Text>Facility not found</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.address}>{data.address}</Text>
      </View>

      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: data.location.latitude,
              longitude: data.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: data.location.latitude,
                longitude: data.location.longitude,
              }}
            />
          </MapView>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.amenitiesTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {data.facilities.map((facility) => (
            <Tag key={facility} text={facility} />
          ))}
        </View>
      </View>
    </View>
  )
}

export default FacilityDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    gap: 16,
  },
  section: {
    gap: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  address: {
    fontSize: 14,
    color: '#777',
  },
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  amenitiesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: 200,
  },
})
