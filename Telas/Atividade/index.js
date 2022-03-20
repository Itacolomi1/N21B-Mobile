import { StatusBar } from 'expo-status-bar';
import {
    Alert, Text, TextInput, TouchableOpacity,
    View, Keyboard, ScrollView
} from 'react-native';
import { useState, useEffect} from 'react';
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


export default function Atividade({ navigator }) {

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
                    <TextInput
                        style={styles.caixaTexto}
                        onChangeText={(texto) => setTipoAtividade(texto)}
                        value={tipoAtividade} />
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
                    <TextInput
                        style={styles.caixaTexto}
                        onChangeText={(texto) => setStatusAtividade(texto)}
                        value={statusAtividade} />
                </View>
            </View>

            <View style={styles.areaBotoes}>
                <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao} onPress={() => limpaCampos()}>
                    <Text style={styles.textoBotao}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao} onPress={() => apagarTudo()}>
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
                                <TouchableOpacity onPress={() => removerElemento(atividade.id)}>
                                    <Ionicons name="md-remove-circle" size={32} color="red" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => editar(atividade.id)}>
                                    <Entypo name="edit" size={32} color="black" />
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