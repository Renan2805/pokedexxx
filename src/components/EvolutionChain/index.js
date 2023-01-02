import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

const EvolutionChain = ({ chainUrl }) => {

  const [evoChainData, setEvoChainData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(chainUrl)
      .then((res) => {
        setEvoChainData(res.data)
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false))
  }, [])

  if(!isLoading) return (
    <View>
      
    </View>
  )
  else return (
    <View>
      <ActivityIndicator size={'small'}/>
    </View>
  )

}

export default EvolutionChain