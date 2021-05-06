const bodyParser = require("body-parser")
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Rota de atendimentos e utilizando GET'))

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento)
        res.send('Está em atendimentos realizando um POST')
    })
    
}