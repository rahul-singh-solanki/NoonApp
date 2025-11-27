import React, { useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, Image, ListRenderItem, Button } from 'react-native'

import { ThemeStyle } from 'theme/ThemeStyle'
import { StackNavigationProp, StackScreen } from 'types/RootStackParams'
import { useCart } from 'hooks/useCartHook'
import QuantityModifier from 'components/QuantityModifier'
import { productKeyExtractor } from 'utils/productKeyExtractor'
import Constants from 'utils/stringConstants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    ...ThemeStyle.h2semibold,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
  },
})

interface CartProps {}
type CartScreen = React.FC<CartProps & StackNavigationProp<StackScreen.CART>>


const Cart: CartScreen = ({ navigation }) => {
  const { cartData, updateCart, isLoading } = useCart()

  const onCheckoutPressed = useCallback(() => {
    navigation.push(StackScreen.CONFIRMATION)
  }, [navigation])

  const onQuantityChange = useCallback((productId: number, newQuantity: number) => {
    updateCart(productId, newQuantity)
  }, [updateCart])

  const renderItem = useCallback<ListRenderItem<CartProduct>>(({ item }) => (
    <CartItem product={item} onQuantityChange={onQuantityChange} />
  ), [onQuantityChange])

  const listFooterComponent = useCallback(() => (
    cartData?.total ?
    <View style={styles.footer}>
      <Text style={styles.totalText}>{Constants.TOTAL}: ${cartData?.total.toFixed(2)}</Text>
      <Button title={Constants.CHECKOUT} onPress={onCheckoutPressed} />
    </View>
    : null
  ), [cartData?.total, onCheckoutPressed])

  const emptyList = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{Constants.YOUR_CART_IS_EMPTY}</Text>
    </View>
  ), [])

  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{Constants.LOADING_MESSAGE}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartData?.products}
        keyExtractor={productKeyExtractor}
        renderItem={renderItem}
        ListFooterComponent={listFooterComponent}
        ListEmptyComponent={emptyList}
      />
    </View>
  )
}

type CartItemProps = {
  product: CartProduct,
  onQuantityChange: (productId: number, newQuantity: number) => void
}

type CartComponentProps = React.FC<CartItemProps>

const CartItem: CartComponentProps = ({ product, onQuantityChange }) => {
  const onPress = useCallback((quantity: number) => {
    onQuantityChange(product.id, quantity)
  }, [onQuantityChange, product.id])

  return(
  <View style={styles.cartItem}>
    <Image source={{ uri: product.thumbnail }} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{product.title}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.itemPrice}>${product.price.toFixed(2)}</Text>
        <QuantityModifier 
          quantity={product.quantity}
          minQuantity={0}
          onQuantityChange={onPress} 
        />
      </View>
    </View>
  </View>
)}

export default Cart
