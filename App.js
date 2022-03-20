import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './Telas/Home';
import TipoAtividade from './Telas/Tipo_Atividade'

export default function App() {

  const Routes = createAppContainer(
    createSwitchNavigator({
      TipoAtividade,
      Home
    })
  );

  return (
    <Routes></Routes>    
  );
}

