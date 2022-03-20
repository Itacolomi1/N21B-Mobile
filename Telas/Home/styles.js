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
    marginTop: 20,
},
atividade: {
    backgroundColor: '#ed8f1c',
    flexDirection: 'row',
    height: 80,
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
areaBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
},
textoBotao: {
    color: '#FFFF',
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

});

export default styles;