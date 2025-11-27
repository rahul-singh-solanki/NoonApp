import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ProductAPI } from 'api/index'

export function useProductInfo(id: number) {
  return useQuery({
    queryKey: ['product', id],
    async queryFn() {
      return ProductAPI.getProductById(id).then(res => res.data)
    },
    enabled: !!id,
  })
}

export function useProductList(limit: number = 10) {
  return useInfiniteQuery({
    queryKey: ['products'],
    initialPageParam: 0,
    async queryFn({ pageParam = 0 }) {
      let offset = pageParam * limit || 0
      return ProductAPI.getPaginatedProducts(limit, offset).then(res => res.data)
    },
    getNextPageParam(lastPage, allPages, lastPageParam) {
      if (lastPage.products.length < limit) {
        return undefined
      }
      return lastPageParam + 1
    }
  })
}

export function useProductSearch(query: string) {
  return useQuery({
    queryKey: ['productSearch', query],
    async queryFn() {
      return ProductAPI.searchProducts(query).then(res => res.data)
    }
  })
}