import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import styles from '../../styles'
import { ucfirst, formatName, setTypeBackgroundColor, formatId } from '../../lib/string'
import { useNavigation } from '@react-navigation/native'

const PokemonCard = ({url}) => {
  
  const [pokemonData, setPokemonData] = useState({})
  const [sprite, setSprite] = useState('')
  const [isLoading, setisLoading] = useState(true)

  const navigation = useNavigation()

  const items = [
    { text: 'Adicionar aos favoritos', onPress: () => {}}
  ]

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setPokemonData(res.data)
        if(res.data.sprites.other !== undefined) {
          setSprite(res.data.sprites.other['official-artwork'].front_default)
        }
        else setSprite(res.data.sprites.front_default)
      })
      .finally(() => setisLoading(false))
  }, [])

  if (!isLoading) return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('Pokemon', {pokemonData: pokemonData})}
    >
      <Image 
        source={{uri: sprite}}
        style={styles.cardSprite}
      />
      <View>
        <Text style={styles.subtitle}>{ucfirst(formatName(pokemonData.name))}</Text>
        <View style={styles.types}>
            {
              pokemonData.types && pokemonData.types.map((type, index) => {
                return (
                  <Text key={index} style={[styles.type, {backgroundColor: setTypeBackgroundColor(type.type.name)}]}>{ucfirst(type.type.name)}</Text>
                )
              })
            }
          </View>
      </View>
      <Text style={styles.id}>{'#' + formatId(pokemonData.id)}</Text>
    </TouchableOpacity>
  )
  else return (
    <View style={[styles.center, {height: 100}]}>
      <ActivityIndicator size={'large'}/>
    </View>
  )
}

export default PokemonCard