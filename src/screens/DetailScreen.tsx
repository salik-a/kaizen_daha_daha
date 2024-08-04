import React, { FC } from "react"
import { ActivityIndicator, ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Screen, Text } from "src/components"
import { useQuery } from "@tanstack/react-query"
import { api, IPromotionDetail } from "../services/api"
import { spacing } from "src/theme"
import { translate } from "../i18n"

interface DetailScreenProps extends AppStackScreenProps<"DetailScreen"> {}

const DetailScreen: FC<DetailScreenProps> = ({ navigation, route }) => {
  const {
    data: promotionDetailData,
    error: promotionDetailError,
    isLoading: promotionDetailLoading,
  } = useQuery<IPromotionDetail, Error>({
    queryKey: ["promotionDetail"],
    queryFn: () => api.getPromotionDetail(Number(route?.params?.Id) ?? 0),
    enabled: true,
  })

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
    <Screen style={$root} preset="scroll">
      <Text text="Detail" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  paddingTop: spacing.sm,
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.xs,
}

export default DetailScreen
