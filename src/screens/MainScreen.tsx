import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Screen, Text } from "src/components"
import { useQuery } from "@tanstack/react-query"
import { api, ITag } from "../services/api"
import { spacing } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface MainScreenProps extends AppStackScreenProps<"MainScreen"> {}

const MainScreen: FC<MainScreenProps> = ({ navigation, route }) => {
  const { data, error, isLoading } = useQuery<ITag[], Error>({
    queryKey: ["tags"],
    queryFn: () => api.getTagsList(),
    enabled: true,
  })

  return (
    <Screen style={$root} preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <Text text="main" />
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

export default MainScreen
