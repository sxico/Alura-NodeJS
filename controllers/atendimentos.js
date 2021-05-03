const bodyParser = require("body-parser")

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Rota de atendimentos e utilizando GET'))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        res.send('Está em atendimentos realizando um POST')
    })
    
}