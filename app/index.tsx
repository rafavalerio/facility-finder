import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import facilities from "../assets/facilities.json";

export default function App() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        data={facilities}
        initialNumToRender={25}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.navigate(`/facilities/${item.id}`)}
            style={styles.listItem}
          >
            <Text>{item.name}</Text>
            <Text style={styles.listItemAddress}>{item.address}</Text>
          </Pressable>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    padding: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listItemAddress: {
    fontSize: 12,
    color: "#777",
  },
});
