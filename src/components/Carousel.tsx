import React, { useCallback, useEffect, useRef } from 'react'
import { FlatList, StyleSheet, Dimensions, View } from 'react-native'
import type { ListRenderItem } from 'react-native'
import FastImage from '@d11/react-native-fast-image'
import { scale } from 'react-native-size-matters'

const { width } = Dimensions.get('window')

interface CarouselProps {
  images: string[];
  height?: number;
}

const Carousel: React.FC<CarouselProps> = ({ images, height = 300 }) => {
  const ref = useRef<FlatList<string>>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset: ((Math.floor(ref.current?.contentOffset?.x ?? 0 / width) + 1) % images.length) * width,
          animated: true,
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])
  
  const renderItem: ListRenderItem<string> = useCallback(({ item }) => (
    <View style={[styles.imageContainer, { width, height }]}>
      <FastImage source={{ uri: item }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
    </View>
  ), [height])

  return (
    <FlatList
      ref={ref}
      data={images}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      decelerationRate="fast"
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