const conexao = require('./conexao')

const execQuery = (query, parametros = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros, (erro, resultados, campos) => {
            if(erro){
                reject(erro)
            }else{
                resolve(resultados)
            }
        })
    })
}

module.exports = execQuery