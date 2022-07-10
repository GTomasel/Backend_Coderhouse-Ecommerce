class MessageDto {
    constructor(datos) {
        this.content = datos.content
        this.userName = datos.userName
        this.userAvatar = datos.userAvatar
        this.from = datos.from
        this.to = datos.to
        this.timestamp = new Date().toLocaleString()
    }
}

module.exports = MessageDto

