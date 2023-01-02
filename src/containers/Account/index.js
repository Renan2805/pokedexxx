import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native'
import { signOut} from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useNavigation } from '@react-navigation/native'

const Account = () => {

  const navigation = useNavigation()

  const doLogOut = () => {
    signOut(auth)
  }

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#ffae4e'}]}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text
          style={[styles.buttonText, {color: 'white'}]}
        >
          Favoritos
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#d11d1d'}]}
        onPress={() => doLogOut()}
      >
        <Text
          style={[styles.buttonText, {color: 'white'}]}
        >
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  main: {
    padding: 10, 
    paddingTop: StatusBar.currentHeight + 10
  },
  button: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10
  },
  buttonText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    textAlign: 'center',
  }
})

export default Account