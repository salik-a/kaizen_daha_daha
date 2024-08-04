import React, { FC } from "react"
import {
  ActivityIndicator,
  View,
  ViewStyle,
  Image,
  TextStyle,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native"
import { AppStackScreenProps, goBack } from "src/navigators"
import { Button, Icon, Screen, Text } from "src/components"
import { useQuery } from "@tanstack/react-query"
import { api, IPromotionDetail } from "../services/api"
import { colors, spacing } from "src/theme"
import { translate } from "../i18n"
import FastImage, { ImageStyle } from "react-native-fast-image"

const { height, width } = Dimensions.get("window")

interface DetailScreenProps extends AppStackScreenProps<"DetailScreen"> {}

const DetailScreen: FC<DetailScreenProps> = ({ route }) => {
  const {
    data: promotionDetailData,
    error: promotionDetailError,
    isLoading: promotionDetailLoading,
  } = useQuery<IPromotionDetail, Error>({
    queryKey: ["promotionDetail"],
    queryFn: () => api.getPromotionDetail(Number(route?.params?.Id) ?? 0),
    enabled: true,
  })

  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "")
  }

  if (promotionDetailLoading) {
    return (
      <Screen
        style={$root}
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$container}
      >
        <ActivityIndicator />
      </Screen>
    )
  }

  if (promotionDetailError) {
    return (
      <Screen
        style={$root}
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$container}
      >
        <Text>{translate("errorScreen.title")}</Text>
      </Screen>
    )
  }

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Pressable style={$backButton} onPress={() => goBack()}>
        <Icon icon="back" color={colors.white} size={30} />
      </Pressable>
      {promotionDetailData && (
        <>
          <ScrollView style={{ height: height }}>
            <View style={$topContainer}>
              <FastImage
                source={{ uri: promotionDetailData.ImageUrl }}
                resizeMode={FastImage.resizeMode.cover}
                style={$image}
              />
              <View style={$topInner}>
                <View style={$logoImageContainer}>
                  <FastImage
                    source={{ uri: promotionDetailData.BrandIconUrl }}
                    resizeMode={FastImage.resizeMode.contain}
                    style={$brandIconImage}
                  />
                </View>
                <View style={$remainingTextContainer}>
                  <Text style={$remainingText}>{promotionDetailData.RemainingText}</Text>
                </View>
              </View>
            </View>
            <View style={$content}>
              <Text style={$title}>{stripHtmlTags(promotionDetailData.Title)}</Text>
              <Text style={$description}>{stripHtmlTags(promotionDetailData.Description)}</Text>
            </View>
          </ScrollView>
          <Button
            text={promotionDetailData.DetailButtonText}
            textStyle={$buttonTextStyle}
            style={$buttonStyles}
          />
        </>
      )}
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingTop: spacing.sm,
  paddingBottom: spacing.sm,
}

const $backButton: ViewStyle = {
  backgroundColor: colors.grayScale,
  borderRadius: 50,
  padding: 10,
  width: 40,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  left: 10,
  top: 40,
  zIndex: 100,
}

const $topContainer: ViewStyle = {
  width: width,
  alignItems: "center",
}

const $topInner: ViewStyle = {
  position: "absolute",
  bottom: -18,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "90%",
}

const $image: ImageStyle = {
  height: height * 0.5,
  width: width,
  borderBottomLeftRadius: 120,
}

const $logoImageContainer: ViewStyle = {
  backgroundColor: colors.white,
  padding: 8,
  borderRadius: 50,
}

const $brandIconImage: ImageStyle = {
  width: 75,
  height: 75,
  borderRadius: 50,
}

const $content: ViewStyle = {
  alignItems: "center",
}

const $title: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  color: "#333",
  marginTop: 25,
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

const $description: TextStyle = {
  fontSize: 16,
  color: colors.black,
  marginTop: 20,
  paddingHorizontal: 8,
}

const $buttonTextStyle: TextStyle = {
  color: colors.white,
}

const $buttonStyles: ViewStyle = {
  backgroundColor: colors.buttonColor,
  borderColor: colors.buttonColor,
  borderRadius: 25,
  width: width - 40,
  height: 50,
  alignSelf: "center",
  position: "absolute",
  bottom: 75,
}

export default DetailScreen
