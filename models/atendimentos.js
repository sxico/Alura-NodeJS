const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento  {
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
}

module.exports = new Atendimento