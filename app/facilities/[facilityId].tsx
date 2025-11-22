import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import facilities from "../../assets/facilities.json";
import { Tag } from "../../components/Tag";

const FacilityDetails = () => {
  const { facilityId } = useLocalSearchParams();

  const facility = facilities.find((facility) => facility.id === facilityId);

  if (!facility) {
    return <Text>Facility not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{facility.name}</Text>
      <Text style={styles.address}>{facility.address}</Text>
      <View style={styles.facilitiesContainer}>
        {facility.facilities.map((facility) => (
          <Tag key={facility} text={facility} />
        ))}
      </View>
    </View>
  );
};

export default FacilityDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#777",
  },
  facilitiesContainer: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
});
