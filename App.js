import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView, Image
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import iconTelefone from './img/phone.png';
import { Ionicons, Entypo } from '@expo/vector-icons';


import {
  createTable,
  obtemTodosContatos,
  adicionaContato,
  alteraContato,
  excluiContato,
  excluiTodosContatos,
} from './services/dbservice';

export default function App() {


  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [contatos, setContatos] = useState([]);
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



  useEffect(
    () => {
      console.log('executando useffect');
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }, [recarregaTela]);


  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }


  async function salvaDados() {
    let novoRegistro = false;
    let identificador = id;

    if (identificador == undefined) {
      identificador = createUniqueId();
      novoRegistro = true;
    }

    let obj = {
      id: identificador,
      nome: nome,
      telefone: telefone,
    };

    try {

      if (novoRegistro) {
        let resposta = (await adicionaContato(obj));

        if (resposta)
          Alert.alert('adicionado com sucesso!');
        else
          Alert.alert('Falhou miseravelmente!');
      }
      else {
        console.log('vamos alterar o contato');
        let resposta = await alteraContato(obj);
        if (resposta)
          Alert.alert('Alterado com sucesso!');
        else
          Alert.alert('Falhou miseravelmente!');
      }

      console.log('aqui é para executar só depois de ter alterado / inserido o contato');
      Keyboard.dismiss();
      limparCampos();
      setRecarregaTela(true);
    } catch (e) {
      Alert.alert(e);
    }
  }

  async function carregaDados() {
    try {
      let contatos = await obtemTodosContatos();
      setContatos(contatos);
      setRecarregaTela(false);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }


  function editar(identificador) {
    const contato = contatos.find(contato => contato.id == identificador);

    if (contato != undefined) {
      setId(contato.id);
      setNome(contato.nome);
      setTelefone(contato.telefone);
    }

    console.log(contato);
  }


  async function limparCampos() {
    setNome("");
    setTelefone("");
    setId(undefined);
    Keyboard.dismiss();
  }


  async function efetivaExclusao() {
    try {
      await excluiTodosContatos();
      setRecarregaTela(true);
    }
    catch (e) {
      Alert.alert(e);
    }
  }

  function apagarTudo() {
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os contatos?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: () => {
            efetivaExclusao();
          }
        },
        {
          text: 'Não!!!',
          style: 'cancel'
        }
      ]));
  }


  function removerElemento(identificador) {
    Alert.alert('Atenção', 'Confirma a remoção do contato?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverContato(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverContato(identificador) {
    try {
      await excluiContato(identificador);
      Keyboard.dismiss();
      limparCampos();
      setRecarregaTela(true);
      Alert.alert('Contato apagado com sucesso!!!');
    } catch (e) {
      Alert.alert(e);
    }
  }



  return (
    <View style={styles.container}>
      <Text style={styles.tituloAgenda}>Agenda de Contatos - v1.0</Text>
      <Text /><Text />


      <View style={styles.areaDados}>

        <View style={styles.areaNome}>
          <Text>Nome</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setNome(texto)}
            value={nome} />
        </View>

        <View style={styles.areaTelefone}>
          <Text>Telefone</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setTelefone(texto)}
            value={telefone}
            keyboardType='phone-pad' />
        </View>

      </View>


      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoApagarTudo]} onPress={() => apagarTudo()}>
          <Text style={styles.textoBotao}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>



      <ScrollView style={styles.listaContatos}>
        {
          contatos.map((contato, index) => (
            <View style={styles.contato} key={index.toString()}>

              <Text style={styles.listaNome}> {contato.nome}</Text>
              <View style={styles.dadosListaTelefone}>

                <Image source={iconTelefone} style={styles.iconTelefone} />
                <Text style={styles.listaTelefone} >{contato.telefone} </Text>
              </View>

              <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(contato.id)}>
                  <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(contato.id)}>
                  <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

              </View>
            </View>
          ))
        }

      </ScrollView>


      <StatusBar style="auto" />
    </View>
  );
}

