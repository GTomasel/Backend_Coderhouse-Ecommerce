class MessageDto {
    constructor(datos) {
        this.content = datos.content;
        this.id = datos.id
        this.timestamp = new Date().toLocaleString()
    }
}

module.exports = MessageDto