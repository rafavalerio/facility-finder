import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

export interface TagProps {
  text: string
  backgroundColor?: string
  textColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
}

export const Tag: React.FC<TagProps> = ({
  text,
  backgroundColor = '#E8F5E9',
  textColor = '#2E7D32',
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.text, { color: textColor }, textStyle]}>{text}</Text>
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
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
})
