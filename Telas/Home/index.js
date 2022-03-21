import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, SafeAreaView, Keyboard, ScrollView, Image
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';


import {
  createTable,
  obtemTodasAtividades,
  alteraAtividade,
} from '../../services/atividade.service'

export default function Home({ navigation }) {

  const [id, setId] = useState();
  const [descricao, setDescricao] = useState();
  const [tipoAtividade, setTipoAtividade] = useState();
  const [localAtividade, setLocalAtividade] = useState();
  const [dataEntrega, setDataEntrega] = useState();
  const [horaEntrega, setHoraEntrega] = useState();
  const [statusAtividade, setStatusAtividade] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const [atividades, setAtividades] = useState([]);
  const [recarregaTela, setRecarregaTela] = useState(true);
  const [criarTabela, setCriarTabela] = useState(false);
  const statusAtividadeData = ["pendente", "concluído"];
  const dropdownRef = useRef({});


  async function processamentoUseEffect() {
    if (!criarTabela) {
      
      setCriarTabela(true);
      await createTable();
    }
    if (recarregaTela) {
     
      await carregaDadosPendentes();
    }
  }

  function DirecionaTela1() {
    navigation.navigate("TipoAtividade");
  }
  function DirecionaTela2() {
    navigation.navigate("Atividade");
  }


  useEffect(
    () => {
      setIsEdit(false);
      processamentoUseEffect();
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

  async function carregaDadosPendentes() {
    try {
      let lista = await obtemTodasAtividades();
      setAtividades(lista.filter(x => x.statusAtividade == "pendente"));
      setRecarregaTela(false);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }
  async function carregaDadosConcluidos() {
    try {
      let lista = await obtemTodasAtividades();
      setAtividades(lista.filter(x => x.statusAtividade == "concluído"));
      setRecarregaTela(false);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function editar(identificador) {
    setIsEdit(true);
    const atividade = atividades.find(atividade => atividade.id == identificador);
    
    
    if (atividade != undefined) {
      setId(atividade.id);
      setDescricao(atividade.descricao);
      setTipoAtividade(atividade.tipoAtividade);
      setLocalAtividade(atividade.localAtividade);
      setDataEntrega(atividade.dataEntrega);
      setHoraEntrega(atividade.horaEntrega);
      setStatusAtividade(atividade.statusAtividade);
    }


  }

  async function SalvarEdicao() {

    setIsEdit(false);
    let obj = {
      id: id,
      descricao: descricao,
      tipoAtividade: tipoAtividade,
      localAtividade: localAtividade,
      dataEntrega: dataEntrega,
      horaEntrega: horaEntrega,
      statusAtividade: statusAtividade
    };

    let resposta = await alteraAtividade(obj);
    if (resposta)
      Alert.alert('Alterado com sucesso!');
    else
      Alert.alert('Falhou miseravelmente!');
    //dropdownRef.current.reset();
    setRecarregaTela(true);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de Cadastro de Atividades</Text>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => DirecionaTela1()}>
          <Text style={styles.textoBotao}> Tipo de Atividades</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => DirecionaTela2()}>
          <Text style={styles.textoBotao}>Cadastrar Atividade</Text>
        </TouchableOpacity>
      </View>


      { isEdit &&
        <View style={styles.areaEdicao}>

          <SelectDropdown
            data={statusAtividadeData}
            ref={dropdownRef}
            onSelect={(selectedItem, index) => {
              setStatusAtividade(selectedItem);
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {

              return selectedItem
            }}
            rowTextForSelection={(item, index) => {

              return item
            }}
          />
          <TouchableOpacity style={styles.botaoSalvar} onPress={() => SalvarEdicao()}>
            <Text style={styles.textoBotaoSalvar}>Salvar</Text>
          </TouchableOpacity>

        </View>
      }

      <Text style={styles.titulo}>Atividades cadastradas FESA</Text>
      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botaoAcao} onPress={() => carregaDadosPendentes()}>
          <Text style={styles.textoBotao}>Pendentes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoAcao} onPress={() => carregaDadosConcluidos()}>
          <Text style={styles.textoBotao}>Concluídas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoAcao} onPress={() => carregaDados()}>
          <Text style={styles.textoBotao}>Todas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaContatos}>
        {
          atividades.map((atividade, index) => (
            <View style={styles.atividade} key={index.toString()}>
              <Text style={styles.listaNome}> {atividade.descricao}</Text>
              <Text style={styles.listaNome}> {atividade.statusAtividade}</Text>
              <View style={styles.dadosBotoesAcao}>

                <TouchableOpacity onPress={() => editar(atividade.id)}>
                  <Entypo name="edit" size={28} color="black" />
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

