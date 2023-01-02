import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import { auth } from "../../lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

  const [email, setEmail] = useState('')
  const [passw, setPassw] = useState('')

  const doLogin = () => {
    signInWithEmailAndPassword(auth, email, passw)
      .then((user) => {

      })
      .catch(e => console.log(e))
  }
  const doSignup = () => {
    createUserWithEmailAndPassword(auth, email, passw)
      .catch(e => console.log(e))
  }


  return (
    <View
      style={styles.main}
    >
      <View
        style={styles.inputs}
      >
        <View
          style={styles.labeledInput}
        >
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={styles.labeledInput}
        >
          <Text style={styles.label}>Senha</Text>
          <TextInput 
            style={styles.input}
            value={passw}
            onChangeText={setPassw}
          />
        </View>
      </View>
      <View
        style={styles.buttons}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => doLogin()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: 'rgb(100, 100, 220)'}]}
          onPress={() => doSignup()}
        >
          <Text style={styles.buttonText}>Registar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginTop: StatusBar.currentHeight,
    padding: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  inputs: {
    flex: 2,
    justifyContent: 'center'
  },
  labeledInput: {
    width: '100%',
  },
  label: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 5,
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    padding: 5
  },
  buttons: {
    flex: 1
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    borderRadius: 5,
    marginVertical: 5
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
    fontSize: 30,
    color: 'white'
  },
})

export default Login