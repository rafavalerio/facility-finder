import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

export interface TagProps {
  /**
   * The text content to display in the tag
   */
  text: string;

  /**
   * Background color of the tag
   * @default '#E8F5E9'
   */
  backgroundColor?: string;

  /**
   * Text color of the tag
   * @default '#2E7D32'
   */
  textColor?: string;

  /**
   * Additional custom styles for the tag container
   */
  style?: ViewStyle;

  /**
   * Additional custom styles for the text
   */
  textStyle?: TextStyle;
}

export const Tag: React.FC<TagProps> = ({
  text,
  backgroundColor = "#E8F5E9",
  textColor = "#2E7D32",
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.text, { color: textColor }, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
});

export default Tag;
