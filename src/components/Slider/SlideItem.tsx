import {
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native"
import React from "react"
import { colors } from "src/theme"
const { width, height } = Dimensions.get("screen")

const SlideItem = ({ item, onPress }: any) => {
  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "")
  }
  const plainText = stripHtmlTags(item.Title)
  return (
    <Pressable style={$container} onPress={onPress}>
      <View style={$topContainer}>
        <Image source={{ uri: item.ImageUrl }} resizeMode="cover" style={[$image]} />
        <View style={$topInner}>
          <View style={$logoImageContainer}>
            <Image
              source={{ uri: item.BrandIconUrl }}
              resizeMode="contain"
              style={$brandIconImage}
            />
          </View>
          <View style={$remainingTextContainer}>
            <Text style={$remainingText}>{item.RemainingText}</Text>
          </View>
        </View>
      </View>
      <View style={$content}>
        <Text style={$title}>{plainText}</Text>
        <Text style={[$daha, { color: item.PromotionCardColor }]}>Daha Daha</Text>
      </View>
    </Pressable>
  )
}

const $container: ViewStyle = {
  width: width - 40,
  height: height * 0.5,
  marginHorizontal: 20,
  marginVertical: 20,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.5,
  shadowRadius: 4.65,
  backgroundColor: "white",
  elevation: 1,
  borderRadius: 15,
}

const $topContainer: ViewStyle = {
  flex: 1,
  width: "90%",
  alignItems: "center",
}

const $topInner: ViewStyle = {
  position: "absolute",
  bottom: -18,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
}

const $image: ImageStyle = {
  flex: 1,
  width: "100%",
  borderRadius: 15,
  borderBottomLeftRadius: 120,
}

const $logoImageContainer: ViewStyle = {
  backgroundColor: colors.white,
  padding: 8,
  borderRadius: 50,
}

const $brandIconImage: ImageStyle = {
  width: 60,
  height: 60,
  borderRadius: 50,
}

const $content: ViewStyle = {
  flex: 0.5,
  alignItems: "center",
}

const $title: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  color: "#333",
  marginTop: 15,
  paddingHorizontal: 4,
}

const $remainingTextContainer: ViewStyle = {
  borderRadius: 15,
  backgroundColor: colors.black,
  paddingHorizontal: 10,
  paddingVertical: 8,
}

const $remainingText: TextStyle = {
  fontSize: 16,
  color: colors.white,
}

const $daha: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginTop: 10,
}

export default SlideItem
