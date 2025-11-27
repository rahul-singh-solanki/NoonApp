interface ProductResponse {
  products:             Product[]
  total:                number
  skip:                 number
  limit:                number
}

interface ProductPayload {
  id:                   number
  quantity:             number
}

interface AddToCartPayload {
  userId: number,
  products: ProductPayload[]
}