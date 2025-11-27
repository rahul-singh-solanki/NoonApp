import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack'

export enum StackScreen {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  CONFIRMATION = 'CONFIRMATION',
}

export type StackParamsList = {
  [StackScreen.HOME]: undefined;
  [StackScreen.SEARCH]: undefined;
  [StackScreen.PRODUCT_DETAIL]: {product: Product};
  [StackScreen.CART]: undefined;
  [StackScreen.CONFIRMATION]: undefined;
};

export type StackScreenOptions = (
  props: StackScreenProps<StackParamsList>
) => StackNavigationOptions

export type StackNavigationProp<RouteName extends keyof StackParamsList> =
  StackScreenProps<StackParamsList, RouteName>

export type UseNavigationProp<T extends keyof StackParamsList = StackScreen.HOME> = StackScreenProps<StackParamsList, T>['navigation']
