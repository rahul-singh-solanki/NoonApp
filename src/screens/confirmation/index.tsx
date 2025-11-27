import { useQueryClient } from '@tanstack/react-query'
import { queryKey } from 'queries/cartQueryHooks'
import React, { useCallback, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import {  scale } from 'react-native-size-matters'

import { ThemeStyle } from 'theme/ThemeStyle'
import { StackNavigationProp, StackScreen } from 'types/RootStackParams'
import Constants from 'utils/stringConstants'


interface ConfirmationProps {}
type ConfirmationScreen = React.FC<ConfirmationProps & StackNavigationProp<StackScreen.CONFIRMATION>>

const Confirmation: ConfirmationScreen = ({ navigation }) => {
  const queryclient = useQueryClient()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackImage: () => null,
      headerBackTitle: '',
    })
  }, [navigation])

  const onBackToShopping = useCallback(() => {
    queryclient.removeQueries({ queryKey })
    navigation.popToTop()
  }, [navigation, queryclient])

  return (
    <View style={styles.container}>
      <Text style={styles.rightIcon}>✅</Text>
      <Text style={styles.confirmationText}>{Constants.YOUR_ORDER_PLACED_SUCCESSFULLY}</Text>
      <Button title="Continue Shopping" onPress={onBackToShopping} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(16),
  },
  rightIcon: {
    fontSize: scale(80),
    marginBottom: scale(12),
  },
  confirmationText: {
    ...ThemeStyle.h1bold,
    textAlign: 'center',
  },
})

export default Confirmation
