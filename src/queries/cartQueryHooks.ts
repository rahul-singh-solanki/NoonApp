import { useQuery } from "@tanstack/react-query"
import { CartAPI } from "api/index"

export const queryKey = ['addCart']

export function useAddCart(products: ProductPayload[] = []) {
  let { data, refetch, ...rest } = useQuery({
    queryKey,
    async queryFn () {
      return CartAPI.addCart({ userId: 1, products }).then(res => res.data)
    },
    enabled: false
  })
  return { cartData: data, loadCart: refetch, ...rest }
}
