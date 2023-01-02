
// Upper case first char
/**
 * 
 * @param {string} string The string to be upper cased 
 * @returns {string} 
 */

export const ucfirst = (string) => {
  if (!string) return ''
  
  return string.charAt(0).toUpperCase() + string.slice(1)
};

export const formatName = (name) => {
  if(!name) return
  if(name === 'Ho-oh') return name
  
  name = name.replace(/-[a-z]+/, '')
  return name
}

export const formatId = (id) => {
  if(!id) return
  const string = id.toString()
  if (string.length == 1) {
    return '00' + string
  }
  else if (string.length == 2) {
    return '0' + string
  }
  else return string
}

// export const formatId = (string) => {
//   const reg = /[0-9]{3}/
//   string.format()
// }

// Object containing all the pokemon type colors
const typeColors = {
  bug: "#73a040",
  dragon: '#6757d3',
  fairy: "#fdb9e9",
  fire: "#fd7d24",
  ghost: "#7b62a3",
  ground : '#b19b71',
  normal: "#a4acaf",
  psychic: "#f366b9",
  steel: "#9eb7b8",
  dark: "#707070",
  electric: "#eed535",
  fighting: "#d56723",
  flying: '#9bade5',
  grass: "#9ccd51",
  ice: "#51c4e7",
  poison: "#b97fc9",
  rock: "#a38c21",
  water: "#4592c4",
};

// This function should be used in a style prop to set the background color depending on the type parameter
export const setTypeBackgroundColor = (type) => {
  if (type === (null || "")) return;
  // @ts-ignore
  return typeColors[type]
};