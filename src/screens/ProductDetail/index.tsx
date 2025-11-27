import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Button, View, Text, StyleSheet, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'

import QuantityModifier from 'components/QuantityModifier'
import { useProductInfo } from 'queries/productQueryHooks'
import { StackNavigationProp, StackScreen } from 'types/RootStackParams'
import Constants from 'utils/stringConstants'
import { Colors } from 'theme/Colors'
import Carousel from 'components/Carousel'
import { ThemeStyle } from 'theme/ThemeStyle'
import Tag from 'components/Tag'
import { useCartForProduct } from 'hooks/useCartHook'

type ProductDetailProps = {}
type ProductDetailScreen = React.FC<ProductDetailProps & StackNavigationProp<StackScreen.PRODUCT_DETAIL>>

const ProductDetail: ProductDetailScreen = ({ navigation, route }) => {
  const { id, title } = route.params.product
  const { data, isLoading, isError, error } = useProductInfo(id)
  const { alreadyInCart, productInfo, updateCart } = useCartForProduct(id)
  const [currentQuantity, setCurrentQuantity] = useState(productInfo?.quantity || 1)

  useEffect(() => {
    setCurrentQuantity(productInfo?.quantity || 1)
  }, [productInfo?.quantity])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    })
  }, [navigation, title])

  const onQuantityChange = useCallback((quantity: number) => {
    if (alreadyInCart) {
      updateCart(id, quantity)
    } else {
      setCurrentQuantity(quantity)
    }
  }, [alreadyInCart, id, updateCart])

  const onAddToCart = useCallback(() => {
    if (alreadyInCart) {
      navigation.navigate(StackScreen.CART)
    } else {
      updateCart(id, currentQuantity)
    }
  }, [alreadyInCart, navigation, updateCart, id, currentQuantity])

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error: {error?.message}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Carousel images={data?.images || []} />        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{data?.title}</Text>
          
          {data?.category && (
            <Text style={styles.category}>{data.category}</Text>
          )}
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${data?.price}</Text>
            {data?.rating && (
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {data.rating}</Text>
                <Text style={styles.ratingCount}>({data.reviews.length} reviews)</Text>
              </View>
            )}
          </View>
          
          {data?.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{data.description}</Text>
            </View>
          )}
          {data?.tags.length ? (
            <View style={styles.ratingContainer}>
              {data.tags.map((tag) => (
                <Tag key={tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </Tag>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <QuantityModifier quantity={currentQuantity} minQuantity={alreadyInCart ? 0 : 1} onQuantityChange={onQuantityChange} />
        <Button color={Colors.button.default} title={alreadyInCart ? Constants.VIEW_CART : Constants.ADD_TO_CART} onPress={onAddToCart} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  contentContainer: {
    padding: scale(16),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: scale(12),
  },
  descriptionContainer: {
    marginBottom: scale(16),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  price: {
    ...ThemeStyle.h1bold,
    color: Colors.button.default,
  },
  tagText: {
    ...ThemeStyle.h5,
    color: Colors.text.default
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rating: {
    ...ThemeStyle.h2semibold,
  },
  ratingCount: {
    ...ThemeStyle.h4,
    color: Colors.text.secondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    ...ThemeStyle.h3,
    color: Colors.text.secondary,
  },
  footer: {
    padding: scale(16),
    gap: scale(12),
    borderTopWidth: 1,
    borderTopColor: Colors.border.primary,
    backgroundColor: Colors.background.default,
    elevation: 5,
  },
})

export default ProductDetail
