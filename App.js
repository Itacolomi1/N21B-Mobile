import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './Telas/Home';
import TipoAtividade from './Telas/Tipo_Atividade'
import Atividade from './Telas/Atividade'

export default function App() {

  const Routes = createAppContainer(
    createSwitchNavigator({
      Home,
      TipoAtividade,
      Atividade
    })
  );

  return (
    <Routes></Routes>    
  );
}

