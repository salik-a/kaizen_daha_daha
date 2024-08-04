import { Animated, View, Dimensions, ViewStyle } from "react-native"
import React from "react"

const { width } = Dimensions.get("screen")

const Pagination = ({ data, scrollX, index }: any) => {
  return (
    <View style={$container}>
      {data.map((item: { PromotionCardColor: any }, idx: number) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width]

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        })

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#ccc", item.PromotionCardColor, "#ccc"],
          extrapolate: "clamp",
        })

        return (
          <Animated.View
            key={idx.toString()}
            style={[$dot, { width: dotWidth, backgroundColor }]}
          />
        )
      })}
    </View>
  )
}

const $container: ViewStyle = {
  position: "absolute",
  bottom: -20,
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
}

const $dot: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
  marginHorizontal: 3,
  backgroundColor: "#ccc",
}

export default Pagination
