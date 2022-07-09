class CartDto {
    constructor(datos) {
        this.id = datos.id
        this.productos = datos.productos;
        this.timestamp = new Date().toLocaleString()
    }
}

module.exports = CartDto