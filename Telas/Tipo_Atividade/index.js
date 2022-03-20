import { StatusBar } from 'expo-status-bar';
import {
    Alert, Text, TextInput, TouchableOpacity,
    View, Keyboard, ScrollView, Image
} from 'react-native';
import { useState, useEffect} from 'react';
import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';

import {
    createTable,
    obtemTodosTipoAtividade,
    adicionaTipoAtividade,
    alteraTipoAtividade,
    excluiTipoAtividade,
    excluiTodosTipoAtividade
} from '../../services/tipo-atividade.service'


export default function TipoAtividade({ navigator }) {

    const [id, setId] = useState();
    const [descricao, setDescricao] = useState();
    const [tiposAtividade, setTiposAtividade] = useState([]);
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
            descricao: descricao,
        };
        console.log('objeto a ser salvo');
        console.log(obj);

        try {

            if (novoRegistro) {
              let resposta = (await adicionaTipoAtividade(obj));
      
              if (resposta)
                Alert.alert('adicionado com sucesso!');
              else
                Alert.alert('Falhou miseravelmente!');
            }
            else {
              console.log('vamos alterar o contato');
              let resposta = await alteraTipoAtividade(obj);
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
            Alert.alert(e);
          }
    }

    async function carregaDados() {
        try {
          let contatos = await obtemTodosTipoAtividade();
          setTiposAtividade(contatos);
          setRecarregaTela(false);
        } catch (e) {
          Alert.alert(e.toString());
        }
      }

    function limpaCampos() {
        setDescricao("");
        setId(undefined);
        Keyboard.dismiss();
    }
    async function efetivaExclusao() {
        try {
          await excluiTodosTipoAtividade();
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
            onPress: () => efetivaRemoverTipoAtividade(identificador),
          },
          {
            text: 'Não',
            style: 'cancel',
          }
        ]);
    }

    function editar(identificador) {
        const tipoAtividade = tiposAtividade.find(tipoAtividade => tipoAtividade.id == identificador);
        console.log('objeto a ser editado');
        console.log(tipoAtividade);
        if (tipoAtividade != undefined) {
          setId(tipoAtividade.id);
          setDescricao(tipoAtividade.descricao);
        }
    
        console.log(tipoAtividade);
    }
    async function efetivaRemoverTipoAtividade(identificador) {
        try {
          await excluiTipoAtividade(identificador);
          Keyboard.dismiss();
          limpaCampos();
          setRecarregaTela(true);
          Alert.alert('Contato apagado com sucesso!!!');
        } catch (e) {
          Alert.alert(e);
        }
      }

    return (
        <View style={styles.container}>
            <Text style={styles.tituloAgenda}>Tipo Atividade</Text>

            <View style={styles.areaDados}>
                <View style={styles.areaNome}>
                    <Text>Descricao</Text>
                    <TextInput
                        style={styles.caixaTexto}
                        onChangeText={(texto) => setDescricao(texto)}
                        value={descricao} />
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
                    tiposAtividade.map((tipoAtividade, index) => (
                        <View style={styles.contato} key={index.toString()}>
                            <Text style={styles.listaNome}>{tipoAtividade.descricao}</Text>

                            <View style={styles.dadosBotoesAcao}>
                                <TouchableOpacity onPress={() => removerElemento(tipoAtividade.id)}>
                                    <Ionicons name="md-remove-circle" size={32} color="red" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => editar(tipoAtividade.id)}>
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