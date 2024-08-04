import React, { FC } from "react"
import { ActivityIndicator, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Button, Icon, Screen, Text, TagButton, Slider } from "src/components"
import { useQuery } from "@tanstack/react-query"
import { api, IPromotions, ITag } from "../services/api"
import { colors, spacing } from "../theme"
import { translate } from "../i18n"

interface MainScreenProps extends AppStackScreenProps<"MainScreen"> {}

const MainScreen: FC<MainScreenProps> = () => {
  const {
    data: tagListData,
    error: tagListError,
    isLoading: tagListLoading,
  } = useQuery<ITag[], Error>({
    queryKey: ["tags"],
    queryFn: () => api.getTagsList(),
    enabled: true,
  })

  const {
    data: promotionsData,
    error: promotionsError,
    isLoading: promotionsLoading,
  } = useQuery<IPromotions[], Error>({
    queryKey: ["promotions"],
    queryFn: () => api.getPromotions(),
    enabled: true,
  })

  if (tagListLoading || promotionsLoading) {
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

  if (tagListError || promotionsError) {
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
      <View style={$headerContainer}>
        <Icon icon={"daha"} size={75} />
        <View style={$headerRightContainer}>
          <Button
            // onPress={buttonOnPress}
            text={translate("screens.logIn")}
            textStyle={$buttonTextStyle}
            style={$buttonStyles}
          />
          <View style={$profileContainer}>
            <Icon icon={"profile"} size={15} />
          </View>
        </View>
      </View>
      {tagListData && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tagListData?.map((tag) => {
            return (
              <TagButton
                key={tag.Id}
                IconUrl={tag.IconUrl}
                Id={tag.Id}
                Name={tag.Name}
                Rank={tag.Rank}
              />
            )
          })}
        </ScrollView>
      )}
      <Slider data={promotionsData} />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.neutral200,
}

const $container: ViewStyle = {
  paddingTop: spacing.sm,
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.xs,
}

const $headerContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing.xs,
  marginVertical: spacing.sm,
}

const $headerRightContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $profileContainer: ViewStyle = {
  padding: spacing.md,
  borderRadius: 50,
  backgroundColor: colors.black,
}

const $buttonTextStyle: TextStyle = {
  color: colors.white,
}

const $buttonStyles: ViewStyle = {
  backgroundColor: colors.buttonColor,
  borderColor: colors.buttonColor,
  borderRadius: 25,
  width: 120,
  height: 50,
  marginRight: 10,
}
export default MainScreen
