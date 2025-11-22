import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Facility Finder" }} />
      <Stack.Screen
        name="facilities/[facilityId]"
        options={{ title: "Facility Details", headerBackTitle: "Back" }}
      />
    </Stack>
  );
}
