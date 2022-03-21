import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    tituloAgenda: {
        fontSize: 30,
        color: '#000',
     marginTop:0,
        width: '100%',
        textAlign: 'center'
    },
    botaoVoltar: {        
        left:10,
        justifyContent: 'space-around',
        width: '100%',      
    },

    caixaTexto: {
        borderColor: "#000",
        borderWidth: 2,
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    botao: {
        width: '30%',
        height: 50,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040d59',
    },
    botaoApagarTudo: {
        backgroundColor: 'red',
    },
    cabecalho:{
        flexDirection: 'row',
        justifyContent: 'center',
    },

    botaoAcao: {
        width: '30%',
        height: 40,
        borderColor: "#191970",
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040d59',
        margin:0,
        textAlign:'center',
    },
    areaDados: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 15,
        width: '100%',
    },
    areaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    textoBotao: {
        color: '#FFF',
    },
    areaNome: {
        width: '55%',
    },
    areaTelefone: {
        width: '30%',
    },

    listaContatos: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        marginTop: 10,
    },
    contato: {
        backgroundColor: '#87CEEB',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    listaNome: {
        width: '40%',
        fontSize: 18,
        paddingRight: 10,
        marginLeft:10,
    },

    dadosListaTelefone: {
        width: '40%',
        flexDirection: 'row',
    },
    dadosBotoesAcao: {
        width: '10%',
        flexDirection: 'row',
    },
    iconTelefone: {
        width: 20,
        height: 25,
        marginRight: 5,
    },
    listaTelefone: {
        width: '35%',
        color: "#FFF",
        fontSize: 18,
    },


});


export default styles;