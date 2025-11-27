import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { View, StyleSheet,  FlatList, ActivityIndicator, Text } from 'react-native'
import type { TextInputChangeEvent, ListRenderItem } from 'react-native'
import { scale } from 'react-native-size-matters'

import ProductSearchItem from 'components/ProductSearchItem'
import useDebounce from 'hooks/useDebounce'
import { useProductSearch } from 'queries/productQueryHooks'
import { StackNavigationProp, StackScreen } from 'types/RootStackParams'
import { productKeyExtractor } from 'utils/productKeyExtractor'
import { ThemeStyle } from 'theme/ThemeStyle'
import { Colors } from 'theme/Colors'
import Constants from 'utils/stringConstants'


interface SearchProps {}
type SearchScreen = React.FC<SearchProps & StackNavigationProp<StackScreen.SEARCH>>
type onChangeEvent = (text: string) => void

const Search: SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('')
  const { data, isLoading, isError, error } = useProductSearch(query)

  const onTextChange = useDebounce<onChangeEvent>(useCallback<onChangeEvent>((text) => {
    setQuery(text)
  }, []), 500)
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (e: TextInputChangeEvent) => onTextChange(e.nativeEvent.text),
        placeholder: Constants.SEARCH_PLACEHOLDER,
        autoFocus: true,
      },
    })
    return () => {
      navigation.setOptions({
        headerSearchBarOptions: undefined,
      })
    }
  }, [navigation, onTextChange])

  const renderItem = useCallback<ListRenderItem<Product>>(({ item }) => (
    <ProductSearchItem product={item} />
  ), [])

  const listHeaderComponent = useMemo(() => (
    isLoading ?
      <ActivityIndicator animating={isLoading} size='large' style={styles.activityIndicator} />
    : null
  ), [isLoading])

  const listEmptyComponent = useMemo(() => {
    if (isLoading) return null
    return (
      <View style={styles.emptyItemContainer}>
        <Text style={styles.emptyText}>
          {isError ? (error?.message ?? Constants.ERROR_MESSAGE) : Constants.NO_RESULTS_FOUND}
        </Text>
      </View>
    )
  }, [isLoading, isError, error])

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.products || []}
        keyExtractor={productKeyExtractor}
        renderItem={renderItem}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  emptyItemContainer: {
    padding: scale(20),
    alignItems: 'center',
  },
  emptyText: {
    ...ThemeStyle.h3,
  },
  activityIndicator: {
    marginVertical: scale(16),
  },
  contentContainerStyle: {
    margin: scale(16),
    marginBottom: scale(32),
    borderRadius: scale(18),
    backgroundColor: Colors.background.default
  }
})

export default Search
