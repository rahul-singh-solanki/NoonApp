import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors } from 'theme/Colors'


interface TagProps {}

const Tag: React.FC<React.PropsWithChildren<TagProps>> = memo((props) => {
  props
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(4),
    paddingVertical: scale(2),
    borderRadius: scale(4),
    backgroundColor: Colors.background.tertiary,
  },
})

export default Tag
