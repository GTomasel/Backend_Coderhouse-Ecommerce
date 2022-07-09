const CartDto = require('../dto/CartDto.js')
const getDao = require('../daos/daoFactory.js')

class CartRepo {

    constructor() {
        this.dao = getDao('carritos')
    }

    async getAll(field, value) {
        const data = await this.dao.getAll(field, value)
        return data
    }

    async getById(field, value) {
        const data = await this.dao.getById(field, value)
        return data
    }

    async save(cart) {
        const dto = new CartDto(cart)
        await this.dao.save(dto)
        return dto.id
    }

    async update(idCart, data) {
        const dto = await this.dao.update(idCart, data)
        return new CartDto(dto)
    }

    async deleteById(idCart) {
        const data = await this.dao.deleteById(idCart)
        return data
    }
}

module.exports = CartRepo