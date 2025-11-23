import { Ionicons } from '@expo/vector-icons'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'

export interface InputProps {
  icon?: React.ReactNode
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}

export const Input: React.FC<InputProps> = ({ icon, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      {icon ? icon : null}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        submitBehavior="blurAndSubmit"
      />
      {value && (
        <Pressable onPress={() => onChangeText('')} hitSlop={10} testID="close-circle">
          <Ionicons name="close-circle" size={20} color="#bbb" />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 24,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
})
