const fs = require('fs')

fs.createReadStream('./assets/nest.png')
    .pipe(fs.createWriteStream('./assets/nest_copia.png'))
    .on('finish', () => console.log('Imagem copiada com sucesso!'))