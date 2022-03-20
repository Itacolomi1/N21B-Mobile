import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView, Image
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';


import {
  createTable,
  obtemTodasAtividades,
  adicionaAtividade,
  alteraAtividade,
  excluiAtividade,
  excluiTodasAtividades
} from '../../services/atividade.service'

export default function Home({navigation}) {

  const [id, setId] = useState();  
  const [atividades, setAtividades] = useState([]);
  const [recarregaTela, setRecarregaTela] = useState(true);
  const [criarTabela, setCriarTabela] = useState(false);


  async function processamentoUseEffect() {
    if (!criarTabela) {
      console.log("Verificando necessidade de criar tabelas...");
      setCriarTabela(true);
      await createTable();
    }
    if (recarregaTela) {
      console.log("Recarregando dados...");
      await carregaDados();
    }
  }

  function DirecionaTela1(){
    navigation.navigate("TipoAtividade");
  }
  function DirecionaTela2(){
    navigation.navigate("Atividade");
  }

  useEffect(
    () => {
      console.log('executando useffect');
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }, [recarregaTela]);
 
  async function carregaDados() {
    try {
      let lista = await obtemTodasAtividades();
      setAtividades(lista);
      setRecarregaTela(false);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }


  return (
    <View style={styles.container}>

<View style={styles.areaBotoes}>
                <TouchableOpacity style={styles.botao} onPress={() => DirecionaTela1() }>
                    <Text style={styles.textoBotao}>Cadastrar Tipo Atividade</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao} onPress={() => DirecionaTela2() }>
                    <Text style={styles.textoBotao}>Cadastrar Atividade</Text>
                </TouchableOpacity>
      </View>

      <Text style={styles.tituloAgenda}>Atividades cadastradas FESA</Text>
      <Text /><Text />   
     

      <ScrollView style={styles.listaContatos}>
        {
          atividades.map((atividade, index) => (
            <View style={styles.atividade} key={index.toString()}>

              <Text style={styles.listaNome}> {atividade.descricao}</Text>
                            
            </View>
          ))
        }

      </ScrollView>

      <StatusBar style="auto" />

    </View>
    
  );
}

