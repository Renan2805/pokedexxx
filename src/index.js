import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import styles from './styles'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Containers
import { Pokemon, PokemonList, Login, Account, Favorites } from './containers'

import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'

// Fonts
import { useFonts } from 'expo-font'
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { auth } from './lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'


const Root = () => {
  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  
  const Stack = createNativeStackNavigator()

  const [isLogged, setIsLogged] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true)
      } else {
        setIsLogged(false)
      }
      setIsLoading(false)
    })
  }, [])

  if(fontsLoaded && !isLoading) {
    if(isLogged) return (
      <NavigationContainer>
        <ExpoStatusBar 
          translucent={true}
        />
        <Stack.Navigator
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen
            name={'List'}
            component={PokemonList}
          />
          <Stack.Screen
            name={'Pokemon'}
            component={Pokemon}
          />
          <Stack.Group>
            <Stack.Screen
              name={'Account'}
              component={Account}
            />
            <Stack.Screen
              name={'Favorites'}
              component={Favorites}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    )
    else return (
      <NavigationContainer>
        <ExpoStatusBar 
          translucent={true}
        />
        <Stack.Navigator
          screenOptions={{headerShown: false}}
        >
          <Stack.Screen 
            name={'Login'}
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  else return (
    <View style={styles.center}>
      <ActivityIndicator size={'large'} />
    </View>
  )
}

export default Root