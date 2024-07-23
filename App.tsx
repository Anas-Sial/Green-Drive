import { StatusBar } from 'react-native'
import React from 'react'
import FlashMessage from 'react-native-flash-message'
import RootNavigator from './src/navigation/RootNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR, commonStyles } from './src/enums/StyleGuide'
import { AuthProvider, AppProvider } from './src/contexts'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <SafeAreaView style={commonStyles.mainContainer}>
      <StatusBar backgroundColor={COLOR.white} barStyle={'dark-content'} />
      <NavigationContainer>
        <AuthProvider>
          <AppProvider>
            <RootNavigator />
          </AppProvider>
        </AuthProvider>
      </NavigationContainer>
      <FlashMessage position={'top'} />
    </SafeAreaView>
  )
}

export default App
