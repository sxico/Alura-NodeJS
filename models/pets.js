const conexao = require('../infraestrutura/conexao')
const uploadArquivo = require('../arquivos/upload_arquivos')
class Pet {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?'

        uploadArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                //const novoPet = {nome: pet.nome, imagem: novoCaminho}
                conexao.query(query, {nome: pet.nome, imagem: novoCaminho}, erro => {
                    if(erro){
                        res.status(400).json(erro)
                    }else{
                        res.status(200).json({nome: pet.nome, imagem: novoCaminho})
                    }
                })
            }
            
        })
    }
}
module.exports = new Pet()