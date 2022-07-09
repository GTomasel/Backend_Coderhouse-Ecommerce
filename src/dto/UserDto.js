class MessageDto {
    constructor(datos) {
        this.username = datos.username
        this.password = datos.password
        this.email = datos.email
        this.address = datos.address
        this.age = datos.age
        this.phone = datos.phone
        this.avatar = datos.avatar
        this.admin = false
    }
}

module.exports = MessageDto