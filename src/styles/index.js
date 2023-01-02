import { StatusBar, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    marginVertical: 10
  },
  subtitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22
  },
  card: {
    width: '100%',
    flexDirection:'row',
  },
  cardSprite: {
    aspectRatio: 1,
    width: 100
  },
  sprite: {
    aspectRatio: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    paddingVertical: 20
  },
  types: {
    flexDirection: 'row',
  },
  type: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5
  },
  id: {
    position: 'absolute',
    right: 5,
    bottom: 0,
    fontFamily: 'Poppins_700Bold',
    fontSize: 48,
    color: 'rgba(0, 0, 0, .2)'
  },
  id_secondary: {
    position: 'absolute',
    right: 0,
    fontFamily: 'Poppins_700Bold',
    fontSize: 42,
    color: 'rgba(0, 0, 0, .6)',
    textAlign: 'right'
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    padding: 10,
    borderRadius: 5,
    marginTop: 20
  },
  stat: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  abilities: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    marginVertical: 20,
    padding: 10,
    paddingBottom: 0
  },
  ability: {
    marginBottom: 10
  }
})

export default styles