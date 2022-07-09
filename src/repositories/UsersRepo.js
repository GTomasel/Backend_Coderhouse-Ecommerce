const UserDto = require('../dto/UserDto.js')
const getDao = require('../daos/daoFactory.js')

class CartRepo {

    constructor() {
        this.dao = getDao('users')
    }

    async getAll(field, value) {
        const data = await this.dao.getAll(field, value)
        return data
    }

    async getById(field, value) {
        const data = await this.dao.getById(field, value)
        return data
    }

    async save(user) {
        const dto = new UserDto(user)
        await this.dao.save(dto)
        return dto.id
    }

    async update(user, data) {
        const dto = await this.dao.update(user, data)
        return new dto
    }

    async deleteById(user) {
        const data = await this.dao.deleteById(user)
        return data
    }
}

module.exports = CartRepo