import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigator from './navigator'
import { StatusBar } from 'react-native'

const queryClient = new QueryClient()

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle="dark-content" />
          <Navigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App
