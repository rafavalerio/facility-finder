// Mock Expo modules
jest.mock('expo-constants', () => ({
  expoConfig: {},
}));

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: Text,
  };
});

