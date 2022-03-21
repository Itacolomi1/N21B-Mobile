import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';

import {
  createTable,
  obtemTodasAtividades,
  adicionaAtividade,
  alteraAtividade,
  excluiAtividade,
  excluiTodasAtividades
} from '../../services/atividade.service';

import { obtemTodosTipoAtividade } from '../../services/tipo-atividade.service'


export default function Atividade({ navigation }) {

  const [id, setId] = useState();
  const [descricao, setDescricao] = useState();
  const [tipoAtividade, setTipoAtividade] = useState();
  const [localAtividade, setLocalAtividade] = useState();
  const [dataEntrega, setDataEntrega] = useState();
  const [horaEntrega, setHoraEntrega] = useState();
  const [statusAtividade, setStatusAtividade] = useState();
  const [recarregaTela, setRecarregaTela] = useState(true);
  const [criarTabela, setCriarTabela] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const statusAtividadeData = ["pendente", "concluído"]
  const dropdownRef = useRef({});
  const dropdownTipoAtividadeRef = useRef({});
  const [listaTipoAtividades, setListaTipoAtividades] = useState([]);

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log('fazer o método')
  //     carregaTipoAtividade();
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

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
      carregaTipoAtividade()
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }, [recarregaTela]);

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  function validaCampos() {

    if (descricao == undefined || descricao.length == 0) {
      Alert.alert('Informe a descricao.');
      return false;
    }
    if (tipoAtividade == undefined || tipoAtividade.length == 0) {
      Alert.alert('Informe o Tipo Atividade.');
      return false;
    }
    if (localAtividade == undefined || localAtividade.length == 0) {
      Alert.alert('Informe o Local Atividade.');
      return false;
    }

      if (dataEntrega == undefined || dataEntrega.length == 0) {
      Alert.alert('Informe a data de entrega.');
      return false;
    }

    var regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    if(!regex.exec(dataEntrega))
    {      
      Alert.alert('Informe uma data válida');
      return false;     
    } 

    if (horaEntrega == undefined || horaEntrega.length == 0) {
      Alert.alert('Informe a Hora Entrega.');
      return false;
    }

    if (statusAtividade == undefined || statusAtividade.length == 0) {
      Alert.alert('Informe o Status da Atividade.');
      return false;
    }

    return true;
  }

  async function salvaDados() {

    if (!validaCampos()) {
      return;
    }

    let novoRegistro = false;
    let identificador = id;

    if (identificador == undefined) {
      identificador = createUniqueId();
      novoRegistro = true;
    }

    let obj = {
      id: identificador,
      descricao: descricao,
      tipoAtividade: tipoAtividade,
      localAtividade: localAtividade,
      dataEntrega: dataEntrega,
      horaEntrega: horaEntrega,
      statusAtividade: statusAtividade
    };
    console.log('objeto a ser salvo');
    console.log(obj);

    try {

      if (novoRegistro) {
        let resposta = (await adicionaAtividade(obj));

        if (resposta)
          Alert.alert('adicionado com sucesso!');
        else
          Alert.alert('Falhou miseravelmente!');
      }
      else {
        console.log('vamos alterar o contato');
        let resposta = await alteraAtividade(obj);
        if (resposta)
          Alert.alert('Alterado com sucesso!');
        else
          Alert.alert('Falhou miseravelmente!');
      }

      console.log('aqui é para executar só depois de ter alterado / inserido o contato');
      Keyboard.dismiss();
      limpaCampos();
      setRecarregaTela(true);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function carregaDados() {
    try {
      let contatos = await obtemTodasAtividades();
      console.log('atividades carregas');
      console.log(contatos);
      setAtividades(contatos);
      setRecarregaTela(false);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function limpaCampos() {
    setDescricao("");
    setTipoAtividade("");
    setLocalAtividade("");
    setDataEntrega("");
    setHoraEntrega("");
    setStatusAtividade("");
    dropdownRef.current.reset();
    dropdownTipoAtividadeRef.current.reset();
    setId(undefined);
    Keyboard.dismiss();
  }
  async function efetivaExclusao() {
    try {
      await excluiTodasAtividades();
      setRecarregaTela(true);
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function carregaTipoAtividade() {
    try {
      console.log('tentar pegar os tipos')
      let contatos = await obtemTodosTipoAtividade();
      console.log('tiposAtividades');
      console.log(contatos);
      setListaTipoAtividades(contatos);
    } catch (e) {
      Alert.alert(e.toString());
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

  function VoltaTela() {
    navigation.navigate("Home");
  }

  function removerElemento(identificador) {
    Alert.alert('Atenção', 'Confirma a remoção do contato?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverAtividade(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  function editar(identificador) {
    const atividade = atividades.find(atividade => atividade.id == identificador);
    console.log('objeto a ser editado');
    console.log(atividade);
    if (atividade != undefined) {
      setId(atividade.id);
      setDescricao(atividade.descricao);
      setTipoAtividade(atividade.tipoAtividade);
      setLocalAtividade(atividade.localAtividade);
      setDataEntrega(atividade.dataEntrega);
      setHoraEntrega(atividade.horaEntrega);
      setStatusAtividade(atividade.statusAtividade);
      //dropdownRef.    onSelect(atividade.statusAtividade,statusAtividadeData.indexOf(atividade.statusAtividade));
      console.log(dropdownRef);
    }

    console.log(atividade);
  }
  async function efetivaRemoverAtividade(identificador) {
    try {
      await excluiAtividade(identificador);
      Keyboard.dismiss();
      limpaCampos();
      setRecarregaTela(true);
      Alert.alert('Contato apagado com sucesso!!!');
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.botaoVoltar}>
        <TouchableOpacity onPress={() => VoltaTela()}>
          <Ionicons name="arrow-back-outline" size={30} color="#191970" />
        </TouchableOpacity>

      </View>
      <Text style={styles.tituloAgenda}>Atividade</Text>

      <View style={styles.areaDados}>
        <View style={styles.areaNome}>
          <Text>Descricao</Text>
          <TextInput
            style={styles.caixaTexto}
            onChangeText={(texto) => setDescricao(texto)}
            value={descricao} />
        </View>
        <View style={styles.areaNome}>
          <Text>Tipo Atividade</Text>
          {/* <TextInput
            style={styles.caixaTexto}
            onChangeText={(texto) => setTipoAtividade(texto)}
            value={tipoAtividade} /> */}
          <SelectDropdown
            data={listaTipoAtividades}
            ref={dropdownTipoAtividadeRef}
            onSelect={(selectedItem, index) => {
              setTipoAtividade(selectedItem.id);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              //setStatusAtividade(selectedItem);
              return selectedItem.descricao
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.descricao
            }}
          />
        </View>
        <View style={styles.areaNome}>
          <Text>Local Atividade</Text>
          <TextInput
            style={styles.caixaTexto}
            onChangeText={(texto) => setLocalAtividade(texto)}
            value={localAtividade} />
        </View>
        <View style={styles.areaNome}>
          <Text>Data Entrega</Text>
          <TextInput
            style={styles.caixaTexto}
            onChangeText={(texto) => setDataEntrega(texto)}
            value={dataEntrega} />
        </View>
        <View style={styles.areaNome}>
          <Text>Hora Entrega</Text>
          <TextInput
            style={styles.caixaTexto}
            onChangeText={(texto) => setHoraEntrega(texto)}
            value={horaEntrega} />
        </View>
        <View style={styles.areaNome}>
          <Text>Status Atividade</Text>
          {/* <TextInput
                        style={styles.caixaTexto}
                        onChangeText={(texto) => setStatusAtividade(texto)}
                        value={statusAtividade} /> */}
          <SelectDropdown
            data={statusAtividadeData}
            ref={dropdownRef}
            onSelect={(selectedItem, index) => {
              setStatusAtividade(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              //setStatusAtividade(selectedItem);
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
        </View>
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botaoAcao} onPress={() => salvaDados()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoAcao} onPress={() => limpaCampos()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoAcao} onPress={() => apagarTudo()}>
          <Text style={styles.textoBotao}>Apagar Tudo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaContatos}>
        {
          atividades.map((atividade, index) => (
            <View style={styles.contato} key={index.toString()}>
              <Text style={styles.listaNome}>{atividade.descricao}</Text>
              <Text style={styles.listaTelefone}>{atividade.statusAtividade}</Text>

              <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(tipoAtividade.id)}>
                  <Ionicons name="trash-outline" size={25} color="#040d59" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(atividade.id)}>
                  <Entypo name="edit" size={32} color="#191970" />
                </TouchableOpacity>

              </View>
            </View>

          ))
        }
      </ScrollView>



      <StatusBar style="auto" />
    </View>
  )


}