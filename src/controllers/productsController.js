const productsRepo = new (require('../repositories/ProductsRepo'))()
const crypto = require('crypto')
const log4js = require('../utils/log4js.js')

let resultMessage = ''


class ProductsController {

    async getAll(field, value) {
        try {
            const content = await productsRepo.getAll(field, value)
            return content
        }
        catch (error) {
            error.message = (`Error al obtener los productos: ${error.message}`)
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    async getById(field, value) {
        try {
            const foundContent = await productsRepo.getById(field, value)
            return foundContent
        }
        catch (error) {
            error.message = (`Error al obtener el producto: ${error.message}`)
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    async add(req, res, next) {
        const addedProduct = req.body
        addedProduct.id = crypto.randomBytes(10).toString('hex')

        const productKeys = ['nombre', 'descripcion', 'codigo', 'foto', 'categoria', 'precio', 'stock']
        const checkAllKeys = productKeys.every(item => addedProduct.hasOwnProperty(item));
        const hasEmptyValues = Object.values(addedProduct).some(x => x === null || x === '')

        try {
            if (checkAllKeys == false || hasEmptyValues == true) {
                const message = `Ingresar todas las propiedades del producto`
                res.set({ 'Refresh': '2; url=/index' });
                res.render('message', {
                    message
                });
            } else {
                const writeResult = await productsRepo.save(addedProduct)

                log4js.logInfo(`Producto agregado: ${writeResult}`)
                const message = `Producto agregado con id ${addedProduct.id}`
                res.set({ 'Refresh': '2; url=/index' });
                res.render('message', {
                    message
                });
            }
        }
        catch (error) {
            error.message = (`Error al agregar el producto: ${error.message}`)
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    async update(req, res, next) {
        const updatedProdData = req.body

        const productKeys = ['nombre', 'descripcion', 'codigo', 'foto', 'categoria', 'precio', 'stock']
        const checkAllKeys = productKeys.every(item => updatedProdData.hasOwnProperty(item))
        const hasEmptyValues = Object.values(updatedProdData).some(x => x === null || x === '')

        try {
            if (checkAllKeys == false || hasEmptyValues == true) {
                const message = `Ingresar todas las propiedades del producto`
                res.set({ 'Refresh': '2; url=/index' });
                res.render('message', {
                    message
                });
            } else {
                await productsRepo.update(updatedProdData.id, updatedProdData)
                resultMessage = `Contenido agregado al producto con id: "${updatedProdData.id}"`
                log4js.logInfo(resultMessage)
                const message = resultMessage
                res.set({ 'Refresh': '2; url=/index' });
                res.render('message', {
                    message
                });
            }
        }
        catch (error) {
            error.message = (`Error al actualizar el producto: ${error.message}`)
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////

    async deleteById(req, res, next) {
        const idProd = req.body.id
        try {
            const result = await productsRepo.deleteById(idProd)

            if (result == 0) {
                resultMessage = `No se encontró el producto`
                log4js.logInfo(resultMessage)
                const message = resultMessage
                res.set({ 'Refresh': '2; url=/index' });
                res.render('message', {
                    message
                });

            } else {
                resultMessage = `El producto con id: "${idProd}" fué eliminado.`
                log4js.logInfo(resultMessage)
                const message = resultMessage
                res.set({ 'Refresh': '2; url=/index' });
                res.render('message', {
                    message
                });
            }
        }
        catch (error) {
            error.message = (`Error al eliminar el producto: ${error.message}`)
            log4js.logError(error)
            throw new Error(error)
        }
    }
}


module.exports = ProductsController