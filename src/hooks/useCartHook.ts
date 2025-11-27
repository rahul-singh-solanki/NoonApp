import { useCallback, useEffect, useMemo, useState } from "react"
import { queryKey, useAddCart } from "queries/cartQueryHooks"
import { useQueryClient } from "@tanstack/react-query"
import { useFocusEffect } from "@react-navigation/native"

export function useCart() {
  const queryClient = useQueryClient()
  const [products, setProducts] = useState<ProductPayload[]>([])
  const { cartData, loadCart, ...rest } = useAddCart(products)

  useFocusEffect(useCallback(() => {
    const data: Cart | undefined = queryClient.getQueryData(queryKey)
    setProducts(data?.products?.map(p => ({ id: p.id, quantity: p.quantity })) ?? [])
  }, [queryClient]))

  const updateCart = useCallback((productId: number, quantity: number) => {
    setProducts(prevProducts => {
      const existingProductIndex = prevProducts.findIndex(p => p.id === productId)
      let updatedProducts = [...prevProducts]
  
      if (existingProductIndex >= 0) {
        if (quantity === 0) {
          updatedProducts.splice(existingProductIndex, 1)
        } else {
          updatedProducts[existingProductIndex].quantity = quantity
        }
      } else {
        updatedProducts.push({ id: productId, quantity })
      }
      if (updatedProducts.length === 0) {
        queryClient.removeQueries({ queryKey })
      }
      return updatedProducts
    })
  }, [queryClient])

  const isProductInCart = useCallback((productId: number) => {
    return products.some(p => p.id === productId)
  }, [products])

  const getProductById = useCallback((productId: number) => {
    return products.find(p => p.id === productId)
  }, [products])

  useEffect(() => {
    if (products.length > 0) {
      loadCart()
    }
  }, [products, loadCart])

  return { cartData, updateCart, loadCart, isProductInCart, getProductById, ...rest }
}

export function useCartForProduct(productId: number) {
  const { cartData, getProductById, isProductInCart, updateCart } = useCart()

  return useMemo(() => {
    return {
      cartData,
      alreadyInCart:  isProductInCart(productId), 
      productInfo: getProductById(productId),
      updateCart
    }
  }, [getProductById, isProductInCart, updateCart, cartData, productId])
}