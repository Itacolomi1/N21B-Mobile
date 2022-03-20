import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },

    listaContatos: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    marginTop: 5,
},
titulo: { 
    fontSize: 25,
    color: 'black',
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
},

atividade: {
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
dadosBotoesAcao: {
    width: '10%',
},
listaNome: {
    width: '38%',
    fontSize: 15,
    paddingRight: 10,
    marginLeft:20,
},
areaBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 3,
},
textoBotao: {
    color: '#FFFF',
},
textoBotaoSalvar: {
    color:  '#191970',
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
    margin:20,
    textAlign:'center',
},
botaoSalvar: {
    width: '30%',
    height: 30,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#48D1CC',
    margin:10,
    textAlign:'center',
    
},
botaoAcao: {
    width: '30%',
    height: 40,
    borderColor: "#191970",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4682B4',
    margin:0,
    textAlign:'center',
},

areaEdicao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 5,
},

});

export default styles;