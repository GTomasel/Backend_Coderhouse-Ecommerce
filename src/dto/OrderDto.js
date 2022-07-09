const crypto = require('crypto')

class OrderDto {
    constructor(datos) {
        this.id = crypto.randomBytes(10).toString('hex')
        this.userId = datos.userId;
        this.productos = datos.productos;
        this.timestamp = new Date().toLocaleString()
    }
}

module.exports = OrderDto