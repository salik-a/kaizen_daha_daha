import { Animated, FlatList, View, ViewStyle } from "react-native"
import React, { useRef, useState } from "react"
import SlideItem from "./SlideItem"
import Pagination from "./Pagination"
import { navigate } from "src/navigators"

export const Slider = ({ data }: any) => {
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
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0]?.index)
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current

  return (
    <View style={$container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <SlideItem item={item} onPress={() => handlePromotionPress(item.Id)} />
        )}
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
