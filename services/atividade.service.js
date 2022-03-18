import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('SistemaAcademicoDB.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS atividadeTB
        (
            id text not null primary key,
            descricao text not null,
            tipoAtividade text not null,
            localAtividade text not null,
            dataEntrega text not null,
            horaEntrega text not null,
            statusAtividade text not null
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




export function obtemTodasAtividades() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from atividadeTB';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            descricao: registros.rows.item(n).nome,
                            tipoAtividade: registros.rows.item(n).tipoAtividade,
                            localAtividade: registros.rows.item(n).localAtividade,
                            dataEntrega: registros.rows.item(n).dataEntrega,
                            horaEntrega: registros.rows.item(n).horaEntrega,
                            statusAtividade: registros.rows.item(n).statusAtividade
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

export function adicionaAtividade(atividade) {

    return new Promise((resolve, reject) => {
        let query = 'insert into atividadeTB (id, descricao ,tipoAtividade, localAtividade, dataEntrega,horaEntrega, statusAtividade) values (?,?,?,?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [atividade.id,
                 atividade.descricao,
                 atividade.tipoAtividade,
                 atividade.localAtividade,
                 atividade.dataEntrega,
                 atividade.horaEntrega,
                 atividade.statusAtividade],
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


export function alteraAtividade(atividade) {
    console.log('começando o método alteraAtividade');
    return new Promise((resolve, reject) => {
        let query = 'update atividadeTB set descricao=?, tipoAtividade=?, localAtividade=?, dataEntrega=?, horaEntrega=?, statusAtividade=? where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [atividade.descricao,
                atividade.tipoAtividade,
                atividade.localAtividade,
                atividade.dataEntrega,
                atividade.horaEntrega,
                atividade.statusAtividade,
                atividade.id],
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



export function excluiAtividade(id) {
    console.log('Apagando contato ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from atividadeTB where id=?';
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


export function excluiTodasAtividades() {
    console.log("Apagando todos os contatos...");
    return new Promise((resolve, reject) => {
        let query = 'delete from atividadeTB';
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
