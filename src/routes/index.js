import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PokemonList } from "../containers";

const Stack = createNativeStackNavigator()

const Index = (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
  >
    <Stack.Screen
      name={'List'} 
      component={PokemonList}
    />
  </Stack.Navigator>
)

export default Index