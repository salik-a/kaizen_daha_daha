import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Screen, Text } from "src/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface MainScreenProps extends AppStackScreenProps<"Main"> {}

export const MainScreen: FC<MainScreenProps> = observer(function MainScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="scroll">
      <Text text="main" />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
