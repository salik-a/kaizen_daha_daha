import { Animated, FlatList, View, ViewStyle } from "react-native"
import React, { useRef, useState } from "react"
import SlideItem from "./SlideItem"
import Pagination from "./Pagination"
import { navigate } from "src/navigators"
import { IPromotions } from "src/services/api"

export const Slider = ({ data }: { data: IPromotions }) => {
  const [index, setIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event)
  }

  const handlePromotionPress = (Id: number) => {
    navigate("DetailScreen", { Id: Id })
  }

  const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setIndex(viewableItems[0]?.index)
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current

  return (
    <View style={$container}>
      <FlatList
        data={data}
        renderItem={({ item }: { item: IPromotions }) => (
          <SlideItem item={item} onPress={() => handlePromotionPress(item.Id)} />
        )}
        keyExtractor={(item: IPromotions) => item?.Id?.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={data} scrollX={scrollX} index={index} />
    </View>
  )
}

const $container: ViewStyle = { marginTop: 20 }
