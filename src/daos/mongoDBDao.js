const config = require('../utils/config')
const dbController = require('../db/mongoDb')
const { model } = require('mongoose');
const log4js = require('../utils/log4js')

const userSchema = require('../schemas/user.schema')
const cartSchema = require('../schemas/cart.schema')
const productSchema = require('../schemas/product.schema')
const orderSchema = require('../schemas/order.schema')
const messageSchema = require('../schemas/message.schema')

const url = config.URL_BASE_DE_DATOS


class mongoDBDao {

    constructor(col) {
        this.collection = col
        this.schema = col == 'productos' ? productSchema : col == 'carritos' ? cartSchema : col == 'ordenes' ? orderSchema : col == 'users' ? userSchema : messageSchema
        this.collectionModel = model(col, this.schema)
    }

    async getAll(field, value) {
        try {
            dbController.conectarMongoDB(url)
            const foundArray = await this.collectionModel.find({ [field]: value }).lean()
            return foundArray
        }
        catch (error) {
            error.message = (`MongoDB find document error`)
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    async getById(field, value) {
        try {
            dbController.conectarMongoDB(url)
            const foundData = await this.collectionModel.findOne({ [field]: value }).lean()
            return foundData
        }
        catch (error) {
            error.message = (`MongoDB find document error`)
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    async deleteById(id) {
        try {
            dbController.conectarMongoDB(url)
            const result = await this.collectionModel.deleteOne({ id: id })

            return result.deletedCount
        }
        catch (error) {
            error.message = (`MongoDB delete document error`)
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    async update(id, array) {

        try {
            dbController.conectarMongoDB(url)
            if (this.collection == 'carritos') {
                await this.collectionModel.updateOne({ id: id }, { $set: { productos: array } })
            } else {
                await this.collectionModel.updateOne({ id: id }, { $set: array })
            }
            return (`El elemento fué actualizado exitosamente`)
        }
        catch (error) {
            error.message = (`MongoDB update document error`)
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    async save(data) {
        try {
            dbController.conectarMongoDB(url)
            const addCollection = await new this.collectionModel(data)
            await addCollection.save()
            return (`Nuevo elemento agregada exitosamente`)
        }
        catch (error) {
            error.message = (`MongoDB save document error`)
            log4js.logError(error)
            throw new Error(error)
        }
    }
}

module.exports = mongoDBDao