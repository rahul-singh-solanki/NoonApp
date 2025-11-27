import React, { useCallback, useLayoutEffect, useMemo } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native'
import type { ListRenderItem } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Assets } from '@react-navigation/elements'
import FastImage from '@d11/react-native-fast-image'

import Product from 'components/Product'
import { useProductList } from 'queries/productQueryHooks'
import { StackNavigationProp, StackScreen } from 'types/RootStackParams'
import { productKeyExtractor } from 'utils/productKeyExtractor'
import ItemSeparator from 'components/ItemSeparator'
import Carousel from 'components/Carousel'


type HomeProps = {}
type HomeScreen = React.FC<HomeProps & StackNavigationProp<StackScreen.HOME>>

const DummyImages = [
  'https://picsum.photos/1280/700?random=1',
  'https://picsum.photos/1280/700?random=2',
  'https://picsum.photos/1280/700?random=3',
]

const HeaderSearchIcon = (onPress: () => void) => (
  <TouchableOpacity onPress={onPress} style={styles.searchIconContainer}>
    <FastImage
      source={Assets[2]}
      style={styles.searchIcon}
    />
  </TouchableOpacity>
)

const Home: HomeScreen = ({ navigation }) => {
  const { data, isLoading, isError, error, isFetching, isRefetching, isFetchingNextPage, hasNextPage, refetch, fetchNextPage } = useProductList(10)

  const onPress = useCallback(() => {
    navigation.push(StackScreen.SEARCH)
  }, [navigation])
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => HeaderSearchIcon(onPress),
    })
  }, [navigation, onPress])


  const products = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap(page => page.products)
  }, [data])

  const HeroCarousel = useCallback(() => {
    return (
      <Carousel images={DummyImages} />
    )
  }, [])
  
  const renderItem = useCallback<ListRenderItem<Product>>(({ item }) => {
    return (
      <View style={styles.contentContainer}>
        <Product product={item} />
      </View>
    )
  }, [])

  const listFooterComponent = useMemo(() => (
    <ActivityIndicator animating={isFetching} size='large' />
  ), [isFetching])

  const onEndReached = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage])


  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      {isLoading && (
        <Text>Loading...</Text>
      )}
      {isError && (
        <Text>Error: {error instanceof Error ? error.message : 'Something went wrong'}</Text>
      )}
      <FlatList
        data={products}
        keyExtractor={productKeyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={HeroCarousel}
        ItemSeparatorComponent={ItemSeparator}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        ListFooterComponent={listFooterComponent}
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingHorizontal: scale(16),
  },
  searchIconContainer: {
    marginRight: scale(10),
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
  },
})

export default Home
