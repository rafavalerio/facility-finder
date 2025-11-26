import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

export interface TagProps {
  text: string
  backgroundColor?: string
  textColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
  selected?: boolean
}

export const Tag: React.FC<TagProps> = ({
  text,
  backgroundColor = '#E8F5E9',
  textColor = '#2E7D32',
  style,
  textStyle,
  selected = false,
}) => {
  return (
    <View
      testID="tag-container"
      style={[styles.container, { backgroundColor }, selected && styles.selected, style]}
    >
      <Text style={[styles.text, { color: textColor }, selected && styles.textSelected, textStyle]}>
        {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  selected: {
    backgroundColor: '#2E7D32',
  },
  textSelected: {
    color: '#FFF',
  },
})
