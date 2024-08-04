import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Screen, Text } from "src/components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface WalletScreenProps extends AppStackScreenProps<"WalletScreen"> {}

const WalletScreen: FC<WalletScreenProps> = ({ navigation, route }) => {
  return (
    <Screen style={$root} preset="scroll">
      <Text text="Wallet" />
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

export default WalletScreen
