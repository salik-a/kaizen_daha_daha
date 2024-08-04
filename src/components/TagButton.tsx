import * as React from "react"
import { Pressable, StyleProp, TextStyle, ViewStyle } from "react-native"
import { colors, typography } from "src/theme"
import { ITag } from "src/services/api"
import { Text } from "./Text"
import FastImage, { ImageStyle } from "react-native-fast-image"

export interface TagButtonProps extends ITag {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

/**
 * Describe your component here
 */
export const TagButton = (props: TagButtonProps) => {
  const { style, onPress, IconUrl, Id, Name, Rank } = props
  const $styles = [$container, style]

  return (
    <Pressable style={$styles} key={Id.toString()} onPress={onPress}>
      <FastImage source={{ uri: IconUrl }} style={$imageStyle} />
      <Text style={$textStyle}>{Name}</Text>
    </Pressable>
  )
}

const $container: ViewStyle = {
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: colors.white,
  borderRadius: 8,
  width: 130,
  height: 45,
  marginHorizontal: 5,
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
}

const $textStyle: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.black,
}

const $imageStyle: ImageStyle = {
  height: 25,
  width: 25,
  borderRadius: 50,
}
