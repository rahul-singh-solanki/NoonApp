import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'

import { StackParamsList, StackScreen } from "types/RootStackParams"
import Home from "screens/home"
import Search from "screens/search"
import ProductDetail from "screens/ProductDetail"
import Cart from "screens/cart"
import Confirmation from "screens/confirmation"

const Stack = createStackNavigator<StackParamsList>()

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={StackScreen.HOME} component={Home} />
        <Stack.Screen name={StackScreen.SEARCH} component={Search} />
        <Stack.Screen name={StackScreen.PRODUCT_DETAIL} component={ProductDetail} />
        <Stack.Screen name={StackScreen.CART} component={Cart} />
        <Stack.Screen name={StackScreen.CONFIRMATION} component={Confirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator