import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { Facility, fetchFacility } from '../../api/api'
import { Tag } from '../../components/Tag'

const FacilityDetails = () => {
  const { facilityId } = useLocalSearchParams()

  const [facility, setFacility] = useState<Facility | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFacilityData = async () => {
      const data = await fetchFacility(facilityId as string)
      setFacility(data)
      setLoading(false)
    }
    fetchFacilityData()
  }, [])

  if (loading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  if (!facility) {
    return <Text>Facility not found</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{facility.name}</Text>
        <Text style={styles.address}>{facility.address}</Text>
      </View>

      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: facility.location.latitude,
              longitude: facility.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: facility.location.latitude,
                longitude: facility.location.longitude,
              }}
            />
          </MapView>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.amenitiesTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {facility.facilities.map((facility) => (
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
    gap: 6,
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    padding: 8,
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: 200,
  },
})
