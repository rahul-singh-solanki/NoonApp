import { View } from "react-native"
import { scale } from "react-native-size-matters"

function ItemSeparator() {
  return <View style={styles.itemSeparator} />
} 

const styles = {
  itemSeparator: { 
    height: scale(16) 
  },
}

export default ItemSeparator