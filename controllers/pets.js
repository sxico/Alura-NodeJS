const Pet = require('../models/pets')

module.exports = app => {
    app.post('/pet', (req, res) => {
        Pet.adiciona(req.body, res)
    })
}