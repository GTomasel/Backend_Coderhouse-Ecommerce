const ProductoDto = require('../dto/ProductDto.js')
const getDao = require('../daos/daoFactory.js')

class ProductosRepo {

    constructor() {
        this.dao = getDao('productos')
    }

    async getAll(field, value) {
        const data = await this.dao.getAll(field, value)
        return data
    }

    async getById(field, value) {
        const data = await this.dao.getById(field, value)
        return data
    }

    async save(prod) {
        const dto = new ProductoDto(prod)
        return await this.dao.save(dto)
    }

    async update(idProd, data) {
        const dto = await this.dao.update(idProd, data)
        return new ProductoDto(dto)
    }

    async deleteById(idProd) {
        const data = await this.dao.deleteById(idProd)
        return data
    }
}

module.exports = ProductosRepo