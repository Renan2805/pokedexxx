import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, FlatList, StatusBar } from 'react-native'

// Firebase
import { auth, db } from '../../lib/firebase'
import { doc, getDocm, onSnapshot } from 'firebase/firestore'
import { PokemonCard } from '../../components'
import { useNavigation } from '@react-navigation/native'
import styles from '../../styles'

const Favorites = () => {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()

  const fetchData = async () => {
    const uid = auth.currentUser.uid
    
    try {
      const docRef = doc(db, `Users/${uid}`)
      onSnapshot(docRef, 
        (snap) => {
          if(snap.exists()) {
            setData(snap.data().favorites)
            setIsLoading(false)
          }
        })
      
    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(() => {
    fetchData()
  }, [])

  if(!isLoading) {
    if(data === null) return (
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <Text style={styles.subtitle}>Nada aqui</Text>
      </View>
    )
    else return (
      <View>
        <FlatList 
          data={data}
          style={{width: '100%', height: '100%', paddingTop: StatusBar.currentHeight}}
          renderItem={(pokemon) => (
            <PokemonCard url={pokemon.item.url} />
          )}
          ListHeaderComponent={
            <View
              style={{paddingHorizontal: 10, marginVertical: 10}}
            >
              <Text style={{
                fontFamily: 'Poppins_700Bold',
                fontSize: 20,
                color: 'rgb(100, 100, 220)',
                borderRadius:  10
              }} onPress={() => navigation.goBack()}>Voltar</Text>
            </View>
          }
        />
      </View>
    )
  }
  else return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <ActivityIndicator size={'large'}/>
    </View>
  )
}

export default Favorites