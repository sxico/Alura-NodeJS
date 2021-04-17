const express = require('express')

const app = express()

app.listen(3000, () => console.info('Servidor escutando a porta 3000'))


app.get('/atendimentos', (req, res) => res.send('Rota de atendimentos'))