import { StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters'

import { Typography } from './Typography'

const ThemeStyle = StyleSheet.create({
  container: {
    marginHorizontal: scale(17),
  },
  h1bold: {
    fontFamily: Typography.bold,
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  h1semibold: {
    fontFamily: Typography.medium,
    fontSize: scale(18),
  },
  h2semibold: {
    fontFamily: Typography.medium,
    fontSize: scale(16),
    fontWeight: '700',
  },
  h3bold: {
    fontFamily: Typography.bold,
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  h3semibold: {
    fontFamily: Typography.medium,
    fontSize: scale(14),
    fontWeight: '700',
  },
  h3: {
    fontFamily: Typography.regular,
    fontSize: scale(14),
  },
  h4: {
    fontFamily: Typography.regular,
    fontSize: scale(12),
  },
  h4semibold: {
    fontFamily: Typography.medium,
    fontSize: scale(12),
  },
  h5: {
    fontFamily: Typography.regular,
    fontSize: scale(11),
  },
  h6bold: {
    fontFamily: Typography.bold,
    fontSize: scale(10),
  },
  h6semibold: {
    fontFamily: Typography.medium,
    fontSize: scale(10),
  },
  h6: {
    fontFamily: Typography.regular,
    fontSize: scale(10),
  },
  h7: {
    fontFamily: Typography.regular,
    fontSize: scale(9),
  },
  flexGrowCenter: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})

export { ThemeStyle }
