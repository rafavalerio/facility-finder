import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import facilities from "../assets/facilities.json";
import { Input } from "../components/Input";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) =>
      facility.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
      <FlatList
        data={filteredFacilities}
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
        ListEmptyComponent={
          <View style={styles.container}>
            <Text style={styles.emptyText}>No facilities found.</Text>
          </View>
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  emptyText: {
    padding: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
  listItem: {
    padding: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  listItemAddress: {
    fontSize: 12,
    color: "#777",
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 24,
    padding: 10,
    paddingHorizontal: 16,
  },
});
