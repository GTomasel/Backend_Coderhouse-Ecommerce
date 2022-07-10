const getDao = require('../daos/daoFactory.js')
const MessageDto = require('../dto/MessageDto')


class ChatRepo {

    constructor() {
        this.dao = getDao('mensajes')
    }

    async getAll(field, value) {
        const data = await this.dao.getAll(field, value)
        return data
    }

    async getById(field, value) {
        const data = await this.dao.getById(field, value)
        return data
    }

    async save(msg) {
        const msgDto = new MessageDto(msg)
        const result = await this.dao.save(msgDto)
        return result
    }

    async update(id, data) {
        const dto = await this.dao.update(id, data)
        return dto
    }

    async deleteById(id) {
        const data = await this.dao.deleteById(id)
        return data
    }
}

module.exports = ChatRepo