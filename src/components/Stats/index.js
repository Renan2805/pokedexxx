import React from 'react'
import { View, Text } from 'react-native'
import styles from "../../styles"

const Stats = ({ stats }) => {

  const formatStat = (stat) => {
    if(!stat) return

    switch(stat) {
      case 'hp':
        return 'hp'
      case 'attack':
        return 'atk'
      case 'defense':
        return 'def'
      case 'special-attack':
        return 'spa'
      case 'special-defense':
        return 'spd'
      case 'speed':
        return 'spe'
    }
  }

  return (
    <View style={styles.stats}>
      {
        stats.map((stat, index) => (
          <View style={styles.stat} key={index}>
            <View
              style={{
                height: stat.base_stat + 100,
                width: 30,
                backgroundColor: 'white',
                borderRadius: 3,
                justifyContent: 'center'
              }}
            >
              <Text style={{textAlign: 'center', fontFamily: 'Poppins_700Bold'}}>{stat.base_stat}</Text>
            </View>
            <Text style={[{fontFamily: 'Poppins_500Medium', color: 'white', fontSize: 20}]}>{formatStat(stat.stat.name)}</Text>
          </View>
        ))
      }
    </View>
  )
}

export default Stats