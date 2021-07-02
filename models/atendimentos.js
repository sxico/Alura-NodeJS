const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento  {
    /*
     * @param {String} - cliente, pet, servico, status, observacoes, data agendamento
     * @return {String} - Status-code (400 ou 200) e informações do cadastro na base de dados
    */
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
                
        const validacao =[
            {
                nome: 'cliente',
                valido: atendimento.cliente.length >= 5,
                mensagem: 'Nome deve ter no mínimo 5 caracteres'
            },
            {
                nome: 'data',
                valido: moment(data).isSameOrAfter(dataCriacao),
                mensagem: 'Data deve ser maior ou igual a data atual'
            }
        ]
        const erros = validacao.filter(campo => !campo.valido)

        if(erros.length) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
            
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })        
        }


    }
    /*
     * @return {Object} - Retorna todos atendimentos cadastrados
    */
    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'
        conexao.query(sql, (erro, resultado) =>  {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultado)
            }
        })
    }
    /*
     * @param {int id} - id do atendimento
     * @return {array} - Status-code (400 ou 200) e informações do atendimento
    */
    getId(req,res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${req}`

        conexao.query(sql, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultado[0])
            }
        })
    }
    patch(req, campos, res) {
        if(campos.data){
            campos.data = moment(campos.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        if(campos.dataCriacao){
            res.status(400).json("Campo dataCriacao não pode ser alterado!") 
        }else{
            const sql = `UPDATE Atendimentos SET ? WHERE id=?`

            conexao.query(sql, [campos, req], (erro, resultado) => {
                if(erro){
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(resultado)
                }
            })
        }
    }
}

module.exports = new Atendimento