import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native'
import styles from '../../styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { formatId, ucfirst, setTypeBackgroundColor } from '../../lib/string'
import { Abilities, EvolutionChain, Stats } from '../../components'
import axios from 'axios'
import DropDownPicker from 'react-native-dropdown-picker'
import { SelectList } from 'react-native-dropdown-select-list'

const Pokemon = () => {

  const route = useRoute()
  const navigation = useNavigation()

  const [pokemonData, setPokemonData] = useState({})
  const [species, setSpecies] = useState({})
  const [speciesUrl, setSpeciesUrl] = useState('')
  const [isShiny, setIsShiny] = useState(false)
  const [isOriginal, setIsOriginal] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const [selected, setSelected] = useState('')
  const [items, setItems] = useState([])


  // Sprites
  const [official, setOfficial] = useState('')
  const [normal, setNormal] = useState('')
  const [shiny, setShiny] = useState('')

  const goToPokemon = (url) => {
    navigation.push('Pokemon', {url: url})
  }

  const fetchSpecies = (url) => {
    axios
      .get(url)
      .then(res => {
        setSpecies(res.data)
        setItems([])
        res.data.varieties.map((item) => {
          setItems(items => [...items, {key: item.pokemon.url, value: ucfirst(item.pokemon.name)}])
        })
      })
      .catch(e => { throw e })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    try {
      if(route.params.url) {
        axios
          .get(route.params.url)
          .then((res) => {
            fetchSpecies(res.data.species.url)
            setPokemonData(res.data)
          })
      }
      else if(route.params.pokemonData){
        setPokemonData(route.params.pokemonData)
        fetchSpecies(route.params.pokemonData.species.url)
      }
    }
    catch (e) {
      console.log(e)
    }
  
  }, [])

  if(!isLoading) return (
    <ScrollView>
      <ImageBackground
        source={{uri: isOriginal ? pokemonData.sprites.other['official-artwork'].front_default : isShiny ? pokemonData.sprites.other.home.front_shiny : pokemonData.sprites.other.home.front_default}}
        style={styles.sprite}
      >
        <View style={{justifyContent: 'space-between', padding: 20, paddingBottom: 0, height: '100%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 16, color: 'rgb(100, 100, 220)', alignSelf: 'flex-start'}} onPress={() => navigation.goBack()}>voltar</Text>
            {
              species.varieties.length > 1 &&
                <SelectList 
                  data={items}
                  setSelected={setSelected}
                  save={'key'}
                  onSelect={() => goToPokemon(selected)}
                  search={false}
                  placeholder={'Formas'}
                  boxStyles={{backgroundColor: 'white', borderWidth: 0}}
                  inputStyles={{fontFamily: 'Poppins_700Bold', fontSize: 16, color: 'rgb(100, 100, 220)'}}
                  dropdownStyles={{backgroundColor: 'white', borderWidth: 0}}
                  dropdownTextStyles={{fontFamily: 'Poppins_500Medium', fontSize: 16, color: 'rgb(100, 100, 220)'}}
                />
            }
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setIsOriginal(!isOriginal)
                  setIsShiny(false)
                }}
                style={{ 
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 30, 
                  justifyContent: 'center',
                  backgroundColor: isOriginal ? 'rgb(100, 100, 220)' : '#fff',
                }}
              >
                <Text 
                  style={{
                    color: isOriginal ? '#fff' : 'rgb(100, 100, 220)',
                    fontFamily: 'Poppins_500Medium',
                    fontSize: 16,
                  }}
                >
                  Original
                </Text>
              </TouchableOpacity>
              <View style={{width: 10}}/>
              <TouchableOpacity
                onPress={() => {
                  isOriginal ? Alert.alert('Indisponivel', 'Desative a arte original para ver o shiny') : setIsShiny(!isShiny) 
                }}
                // disabled={isOriginal ? true : false}
                style={{ 
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 30, 
                  justifyContent: 'center',
                  backgroundColor: isOriginal ? 'rgba(255, 255, 255, 0.5)' : isShiny ? 'rgb(100, 100, 220)' : '#fff',
                }}
              >
                <Text 
                  style={{
                    color: isShiny ? '#fff' : 'rgb(100, 100, 220)',
                    fontFamily: 'Poppins_500Medium',
                    fontSize: 16,
                  }}
                >
                  Shiny
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.id_secondary}>{'#' + formatId(pokemonData.id)}</Text>
          </View>
        </View>
      </ImageBackground>
      <View
        style={styles.main}
      >
        <Text style={[styles.title, {marginVertical: 0, fontSize: 42}]}>{ucfirst(pokemonData.name)}</Text>
        <View style={styles.types}>
          {
            pokemonData.types.map((type, index) => {
              return (
                <Text key={index} style={[styles.type, {backgroundColor: setTypeBackgroundColor(type.type.name)}]}>{ucfirst(type.type.name)}</Text>
              )
            })
          }
        </View>
        <Stats stats={pokemonData.stats}/>
      </View>
      <View style={styles.abilities}>
        <Text style={[styles.title, {color: 'white'}]}>Abilidades</Text>
        {
          pokemonData.abilities.map((ability, index) => (
            <Ability key={index} url={ability.ability.url}/>
          ))
        }
      </View>
      {
        species.evolution_chain &&
          <EvolutionChain chainUrl={species.evolution_chain.url}/>
      }
      <View style={{height: 40, alignItems: 'center', justifyContent: 'center'}}><Text>Copyright</Text></View>
    </ScrollView>
  )
  else return (
    <View style={styles.center}>
      <ActivityIndicator size={'large'}/>
    </View>
  )

}

const Ability = ({ url }) => {

  const [abilityData, setAbilityData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const getEnglishDesc = (entries) => {
    if(entries == undefined) return ''
    for(let i = 0; i <= entries.length; i++) {
      const entry = entries[i]
      if(entry == undefined) return ''
      else if(entry.language.name == 'en') return entry
    }
  }


  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setAbilityData(res.data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  if(!isLoading) return (
    <View style={styles.ability}>
      <Text style={[styles.subtitle, {color: 'white'}]}>{ucfirst(abilityData.name)}</Text>
      <Text style={[styles.text, {textAlign: 'justify', color: 'white'}]}>{getEnglishDesc(abilityData.effect_entries).short_effect}</Text>
    </View>
  )
  else return (
    <View>
      <ActivityIndicator size={'small'}/>
    </View>
  )
}

export default Pokemon