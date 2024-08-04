import { Text, View, Dimensions, Pressable, ViewStyle, TextStyle } from "react-native"
import React from "react"
import { colors } from "src/theme"
import FastImage, { ImageStyle } from "react-native-fast-image"
const { width, height } = Dimensions.get("screen")

const SlideItem = ({ item, onPress }: any) => {
  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "")
  }
  const plainText = stripHtmlTags(item.Title)
  return (
    <Pressable style={$container} onPress={onPress}>
      <View style={$topContainer}>
        <FastImage
          source={{ uri: item.ImageUrl }}
          resizeMode={FastImage.resizeMode.cover}
          style={$image}
        />
        <View style={$topInner}>
          <View style={$logoImageContainer}>
            <FastImage
              source={{ uri: item.BrandIconUrl }}
              resizeMode={FastImage.resizeMode.contain}
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
      <View style={[$bottom, { backgroundColor: item.PromotionCardColor }]} />
    </Pressable>
  )
}

const $container: ViewStyle = {
  width: width - 80,
  height: height * 0.5,
  marginHorizontal: 10,
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
  width: "100%",
  alignItems: "center",
  padding: 5,
}

const $topInner: ViewStyle = {
  position: "absolute",
  bottom: 0,
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
  zIndex: 100,
  width: "100%",
  backgroundColor: "white",
  borderBottomRightRadius: 15,
  borderBottomLeftRadius: 15,
}

const $title: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  color: "#333",
  marginTop: 15,
  paddingHorizontal: 4,
  flex: 1,
}

const $remainingTextContainer: ViewStyle = {
  borderRadius: 15,
  backgroundColor: colors.black,
  paddingHorizontal: 10,
  paddingVertical: 8,
  marginTop: 15,
}

const $remainingText: TextStyle = {
  fontSize: 16,
  color: colors.white,
}

const $daha: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  marginBottom: 10,
}

const $bottom: ViewStyle = {
  width: "100%",
  height: 40,

  position: "absolute",
  bottom: -12,
  borderRadius: 25,
  zIndex: -1,
  transform: [{ rotate: "2deg" }],
}

export default SlideItem
