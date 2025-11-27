import apiClient from "api/config/axios"

export const CartAPI = {
  addCart(payload: AddToCartPayload) {
    return apiClient.post<Cart>('/carts/add', payload)
  }
}

