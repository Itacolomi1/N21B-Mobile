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
        fontSize: 25,
        color: '#000',
                width: '100%',
        textAlign: 'center'
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
    areaDados: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        margin:10,
    },
    areaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
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
        marginTop: 20,
    },
    contato: {
        backgroundColor: '#87CEEB',
    
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    margin: 10,
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
        width: '75%',
        fontSize: 18,
        paddingRight: 10,
        marginLeft:20,
    },

    dadosListaTelefone: {
        width: '40%',
        flexDirection: 'row',
    },
    dadosBotoesAcao: {
        width: '10%',
        flexDirection:'row',
    },
    iconTelefone: {
        width: 20,
        height: 25,
        marginRight: 5,
    },
    listaTelefone: {
        color: "#FFF",
        fontSize: 18,
    },
    botaoVoltar: {        
        left:10,
        justifyContent: 'space-around',
        width: '100%',      
    },


});


export default styles;