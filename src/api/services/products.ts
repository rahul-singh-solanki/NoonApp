import apiClient from '../config/axios'

export const ProductAPI = {
  getPaginatedProducts(limit: number, skip: number) {
    return apiClient.get<ProductResponse>(`/products`, { params: { limit, skip } })
  },
  getProductById(productId: number) {
    return apiClient.get<Product>(`/products/${productId}`)
  },
  searchProducts(query: string, limit: number = 10) {
    return apiClient.get<ProductResponse>(`/products/search`, { params: { q: query, limit } })
  }
}
