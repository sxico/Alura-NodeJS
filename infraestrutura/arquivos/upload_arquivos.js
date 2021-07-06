const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeArquivo, callbackImagemCriada) => {
    const caminhoDestino = `./assets/imagens/${nomeArquivo}${path.extname(caminho)}`
    if(['png', 'jpg', 'jpeg'].indexOf(path.extname(caminho).substring(1)) !== -1){
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(caminhoDestino))
            .on('finish', () => callbackImagemCriada(false, caminhoDestino))
    }else {
        console.log('Tipo de extensão inválido!')
        const erro = "Extensão do arquivo é inválido"
        callbackImagemCriada(erro)
    }
}