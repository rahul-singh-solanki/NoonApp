import React, { useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors } from 'theme/Colors'

interface QuantityModifierProps {
  quantity: number;
  minQuantity?: number;
  maxQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const QuantityModifier: React.FC<QuantityModifierProps> = ({
  quantity = 1,
  minQuantity = 1,
  maxQuantity = 99,
  onQuantityChange,
}) => {
  const handleIncrement = useCallback(() => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1
      onQuantityChange?.(newQuantity)
    }
  }, [quantity, maxQuantity, onQuantityChange])

  const handleDecrement = useCallback(() => {
    if (quantity > minQuantity) {
      const newQuantity = quantity - 1
      onQuantityChange?.(newQuantity)
    }
  }, [quantity, minQuantity, onQuantityChange])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, quantity <= minQuantity && styles.buttonDisabled]}
        onPress={handleDecrement}
        disabled={quantity <= minQuantity}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
      
      <TouchableOpacity
        style={[styles.button, quantity >= maxQuantity && styles.buttonDisabled]}
        onPress={handleIncrement}
        disabled={quantity >= maxQuantity}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: Colors.button.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityContainer: {
    marginHorizontal: 16,
    minWidth: 40,
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
})

export default QuantityModifier