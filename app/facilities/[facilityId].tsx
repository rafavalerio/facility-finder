import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const FacilityDetails = () => {
  const { facilityId } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>Facility Details {facilityId}</Text>
    </View>
  );
};

export default FacilityDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
