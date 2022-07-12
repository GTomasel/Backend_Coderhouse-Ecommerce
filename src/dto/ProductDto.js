const crypto = require('crypto')

class ProductDto {
    constructor(datos) {
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
        this.codigo = datos.codigo;
        this.foto = datos.foto;
        this.categoria = datos.categoria;
        this.precio = datos.precio;
        this.stock = datos.stock;
        this.id = crypto.randomBytes(10).toString('hex')
        this.timestamp = new Date().toLocaleString()
    }
}

module.exports = ProductDto
