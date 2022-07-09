const OrderDto = require('../dto/OrderDto')
const getDao = require('../daos/daoFactory.js')

class OrderRepo {

    constructor() {
        this.dao = getDao('ordenes')
    }

    async getAll(field, value) {
        const data = await this.dao.getAll(field, value)
        return data
    }

    async save(order) {
        const dto = new OrderDto(order)
        await this.dao.save(dto)
        return dto.id
    }

}

module.exports = OrderRepo