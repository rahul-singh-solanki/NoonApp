import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import type { ListRenderItem, ViewToken } from 'react-native'
import Animated from 'react-native-reanimated'
import { scale } from 'react-native-size-matters'
import FastImage from '@d11/react-native-fast-image'
import { useIsFocused } from '@react-navigation/native'
import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

interface CarouselProps {
  images: string[];
  height?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, height = 300 }) => {
  const ref = useRef<Animated.FlatList<string>>(null)
  const scrollX = useSharedValue(0)
  const currentIndex = useRef(0)
  const isFocused = useIsFocused()
  const intervalRef = useRef<number | null>(null)

  const scrollToNext = useCallback(() => {
    if (ref.current) {
      currentIndex.current = (currentIndex.current + 1) % images.length
      ref.current.scrollToOffset({
        offset: currentIndex.current * width,
        animated: true,
      })
    }
  }, [images.length])

  const startAutoScroll = useCallback(() => {
    intervalRef.current = setInterval(scrollToNext, 3000)
  }, [scrollToNext])

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isFocused) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }
    return stopAutoScroll
  }, [isFocused, stopAutoScroll, startAutoScroll])

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x
    },
  })

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        currentIndex.current = viewableItems[0].index
      }
    },
    []
  )

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current
  
  const renderItem: ListRenderItem<string> = useCallback(({ item }) => (
    <View style={[styles.imageContainer, { width, height }]}>
      <FastImage source={{ uri: item }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
    </View>
  ), [height])

  return (
    <Animated.FlatList
      ref={ref}
      data={images}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={width}
      snapToAlignment="center"
      decelerationRate="fast"
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default Carousel