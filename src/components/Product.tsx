import React, { useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import Image from '@d11/react-native-fast-image'

import { ThemeStyle } from 'theme/ThemeStyle'
import { Colors } from 'theme/Colors'
import Tag from './Tag'
import { scale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { StackScreen, UseNavigationProp } from 'types/RootStackParams'

interface ProductProps {
  containerStyle?: StyleProp<ViewStyle>
  product: Product
  disableClick?: boolean
}

const Product: React.FC<ProductProps> = props => {
  const navigation = useNavigation<UseNavigationProp>()
  const { disableClick, containerStyle } = props
  const { title, description, price, availabilityStatus, shippingInformation, tags, thumbnail } = props.product

  const onPress = useCallback(() => {
    navigation.push(StackScreen.PRODUCT_DETAIL, { product: props.product })
  }, [navigation, props.product])

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={disableClick}
      activeOpacity={disableClick ? 1 : 0.6}
    >
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.tagsContainer}>
          {tags.map(tag => (
            <Tag key={tag}><Text style={styles.tag}>{tag}</Text></Tag>
          ))}
        </View>
        <Text style={styles.price}>Price: ${price}</Text>
        <Text>{availabilityStatus} | {shippingInformation}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(8),
    flexDirection: 'row',
    backgroundColor: Colors.background.default,
    elevation: 2,
  },
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100 
  },
  content: {
    ...ThemeStyle.flexGrowCenter,
    flex: 1,
    gap: scale(4),
    padding: 8
  },
  title: {
    ...ThemeStyle.h3bold
  },
  description: {
    ...ThemeStyle.h6semibold,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(4),
  },
  tag: {
    ...ThemeStyle.h7,
    color: Colors.text.default
  },
  price: {
    ...ThemeStyle.h3bold,
  }
})

export default Product
