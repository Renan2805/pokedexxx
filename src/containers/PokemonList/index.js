import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, FlatList, StatusBar } from 'react-native'
import axios from 'axios'

import { PokemonCard } from '../../components'
import styles from '../../styles'
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native'

const PokemonList = () => {

  const navigation = useNavigation()

  const [pokemons, setPokemons] = useState([])
  const [isLoading, setisLoading] = useState(true)

  const listRef = useRef(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;

  const [selected, setSelected] = useState({})

  const limits_offsets = [
    {
      offset: '0',
      limit: '151'
    },
    {
      offset: '151',
      limit: '100'
    },
    {
      offset: '251',
      limit: '135'
    },
    {
      offset: '386',
      limit: '107'
    },
    {
      offset: '493',
      limit: '156'
    },
    {
      offset: '649',
      limit: '72'
    },
    {
      offset: '721',
      limit: '88'
    },
    {
      offset: '809',
      limit: '96'
    },
  ]

  const gens = [
    {
      key: 0,
      value: 'Geração 1'
    },
    {
      key: 1,
      value: 'Geração 2'
    },
    {
      key: 2,
      value: 'Geração 3'
    },
    {
      key: 3,
      value: 'geração 4'
    },
    {
      key: 4,
      value: 'Geração 5'
    },
    {
      key: 5,
      value: 'Geração 6'
    },
    {
      key: 6,
      value: 'Geração 7'
    },
    {
      key: 7,
      value: 'Geração 8'
    },
  ]


  const fetchGen = (limit, offset) => {
    setPokemons([])
    setisLoading(true)
    // let source = axios.CancelToken.source()
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((res) => {
        setPokemons(res.data.results)
      })
      .finally(() => setisLoading(false))

  }

  useEffect(() => {
    fetchGen(limits_offsets[0].limit, limits_offsets[0].offset)
  }, [])

  if(!isLoading) return (
    <View> 
      <FlatList 
        data={pokemons}
        style={{width: '100%', height: '100%', paddingTop: StatusBar.currentHeight}}
        renderItem={(pokemon) => (
          <PokemonCard url={pokemon.item.url} />
        )}
        ListHeaderComponent={
          <View
            style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingHorizontal: 10}}
          >
            <Text style={{
              fontFamily: 'Poppins_700Bold',
              fontSize: 24,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, .5)',
              paddingVertical: 5,
              paddingHorizontal: 15,
              marginHorizontal: 10,
              borderRadius:  10
            }} onPress={() => navigation.navigate('Account')}>Conta</Text>
            <SelectList 
              data={gens}
              search={false}
              save={'key'}
              placeholder={'Geração'}
              setSelected={setSelected}
              onSelect={() => {
                fetchGen(limits_offsets[selected].limit, limits_offsets[selected].offset)
              }}
              fontFamily={'Poppins_500Medium'}
              dropdownTextStyles={{color: 'white'}}
              inputStyles={{color: 'white'}}
              boxStyles={{borderWidth: 0, backgroundColor: 'rgb(100, 100, 220)'}}
              dropdownStyles={{backgroundColor: 'rgb(100, 100, 220)', borderWidth: 0}}
            />
          </View>
        }
        ItemSeparatorComponent={<View style={{width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)'}}/>}
        ref={listRef}
        onScroll={event => {
          setContentVerticalOffset(event.nativeEvent.contentOffset.y);
        }}
      />
      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <Text
          style={{
            padding: 10,
            backgroundColor: 'rgba(100, 100, 220, 1)',
            borderRadius: 10  ,
            fontFamily: 'Poppins_500Medium',
            fontSize: 16,
            color: 'white',
            position: 'absolute',
            bottom: 10,
            right: 10
          }}
          onPress={() => listRef.current.scrollToOffset({ offset: 0, animated: true })}
        >
          Voltar ao topo
        </Text>
      )}  
    </View>
  )
  else return (
    <View style={styles.center}>
      <ActivityIndicator size={'large'}/>
    </View>
  )
}


const Header = ({callback}) => {

  const [selected, setSelected] = useState({})


  return (
    <View
      style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
    >
      <Text style={[styles.title, {marginHorizontal: 10, alignSelf: 'flex-start'}]}>Pokemons</Text>
      <SelectList 
        data={gens}
        search={false}
        placeholder={'Geração'}
        setSelected={setSelected}
        onSelect={() => callback}
      />
    </View>
  )
}

export default PokemonList