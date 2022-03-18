import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('SistemaAcademicoDB.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tipoAtividadeTB
        (
            id text not null primary key,
            descricao text not null              
        )`;

        let dbCx = getDbConnection();
        dbCx.transaction(
            (tx) => tx.executeSql(query, [],
                (tx, resultado) => resolve(true)
            )
        ,
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};




export function obtemTodosTipoAtividade() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tipoAtividadeTB';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            nome: registros.rows.item(n).descricao,                            
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function adicionaTipoAtividade(tipoAtividade) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tipoAtividadeTB (id, descricao) values (?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [tipoAtividade.id, tipoAtividade.descricao],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function alteraTipoAtividade(tipoAtividade) {
    console.log('começando o método alteraTipoAtividade');
    return new Promise((resolve, reject) => {
        let query = 'update tipoAtividadeTB set descricao=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [tipoAtividade.descricao, tipoAtividade.id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}



export function excluiTipoAtividade(id) {
    console.log('Apagando tipoAtividade ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from tipoAtividadeTB where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function excluiTodosTipoAtividade() {
    console.log("Apagando todos os tiposAtividades...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tipoAtividadeTB';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}
