import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Tag from './Tag'
import { ThemeStyle } from 'theme/ThemeStyle'
import { Colors } from 'theme/Colors'
import { UseNavigationProp, StackScreen } from 'types/RootStackParams'
import { scale } from 'react-native-size-matters'

type ProductSearchItemProps = {
  product: Product
}

const ProductSearchItem: React.FC<ProductSearchItemProps> = ({ product }) => {
  const navigation = useNavigation<UseNavigationProp<StackScreen.SEARCH>>()

  const onPress = useCallback(() => {
    navigation.navigate(StackScreen.PRODUCT_DETAIL, { product })
  }, [navigation, product])

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.tagsContainer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.tags?.map((tag, index) => (
            <Tag key={index}><Text style={styles.tag}>{tag}</Text></Tag>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    // borderRadius: scale(8),
  },
  image: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
  },
  infoContainer: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    ...ThemeStyle.h3bold,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    ...ThemeStyle.h7,
    color: Colors.text.default
  },
})

export default ProductSearchItem
