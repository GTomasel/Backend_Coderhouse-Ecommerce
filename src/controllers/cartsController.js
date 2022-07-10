const cartRepo = new (require('../repositories/CartsRepo'))()
const productController = new (require('../controllers/productsController'))()

const log4js = require('../utils/log4js')

let resultMessage = ''


class CartsControllers {

    async addCart(id) {
        try {
            const newEmptyCart = []
            newEmptyCart.productos = []
            newEmptyCart.id = id

            const resultId = await cartRepo.save(newEmptyCart)
            log4js.logInfo(`Nuevo carrito creado con éxito para el usuario: ${resultId}`)
            return resultId
        }
        catch (error) {
            error.message = `Error al añadir carrito: ${error.message}`
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    async deleteCart(req, res, next) {
        const idCart = req.params.id
        try {
            await cartRepo.deleteById(idCart)
            resultMessage = `El carrito con id: ${req.params.id} fué eliminado.`
            log4js.logInfo(resultMessage)
            res.send(resultMessage)
        }
        catch (error) {
            error.message = `Error al eliminar carrito: ${error.message}`
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    async getCartProdsFromId(req, res, next) {
        const idCart = req.params.id
        try {
            const cartArray = await cartRepo.getById("id", idCart)

            if (cartArray == null) {
                resultMessage = `Carrito ${idCart} inexsistente`
                log4js.logWarn(resultMessage)
                throw new Error(resultMessage)

            } else if (cartArray.productos.length == 0) {
                res.set({ 'Refresh': '2; url=/index' })
                const message = `Carrito vacío, regresando al inicio...`
                res.render('message', {
                    message
                });

            } else {
                const foundProducts = cartArray.productos
                const userData = {
                    username: req.session.username,
                    userAvatar: req.session.userAvatar,
                    userCartId: req.session.email
                }
                req.session.userCartContent = foundProducts
                res.render('user-cart', { foundProducts, userData })
            }
        }
        catch (error) {
            error.message = `Error al obtener el carrito: ${error.message}`
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    async addProdsToCartId(req, res, next) {
        const idCart = req.params.id
        const idProd = req.params.id_prod
        const newProduct = await productController.getById("id", idProd)
        newProduct.qty = Number(req.body.qty)

        try {
            const cartArray = await cartRepo.getById("id", idCart)
            const findDuplicated = cartArray.productos.find(prod => prod.id == newProduct.id)

            if (findDuplicated !== undefined) {
                newProduct.qty += findDuplicated.qty

                if (newProduct.qty > newProduct.stock) {
                    res.set({ 'Refresh': '3; url=/index' })
                    const message = `No hay más stock del producto, regresando al inicio.. `
                    res.render('message', {
                        message
                    })
                } else {
                    const itemIndex = cartArray.productos.findIndex(prod => prod.id == newProduct.id)
                    cartArray.productos[itemIndex] = { ...cartArray.productos[itemIndex], qty: newProduct.qty }
                    await cartRepo.update(idCart, cartArray.productos)
                    res.redirect(`/api/carrito/${idCart}/productos`)
                }

            } else {
                cartArray.productos.push(newProduct)
                await cartRepo.update(idCart, cartArray.productos)
                res.redirect(`/api/carrito/${idCart}/productos`)
            }
        }
        catch (error) {
            error.message = `Error al agregar un producto al carrito: ${error.message}`
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    async deleteProdFromCart(req, res, next) {
        const idCart = req.params.id
        const idProd = req.params.id_prod
        try {
            const cartArray = await cartRepo.getById("id", idCart)

            if (cartArray == null) {
                resultMessage = `Carrito ${idCart} inexsistente`
                log4js.logError(resultMessage)
                throw new Error(resultMessage)

            } else {
                const foundProduct = cartArray.productos.find(e => e.id == idProd)
                if (foundProduct == null) {
                    resultMessage = `No se encontró el producto con id: ${idProd} del carrito`
                    log4js.logError(resultMessage)
                    throw new Error(resultMessage)
                } else {
                    const indexOfProduct = cartArray.productos.indexOf(foundProduct)
                    cartArray.productos.splice(indexOfProduct, 1)
                    await cartRepo.update(idCart, cartArray.productos)
                    log4js.logInfo(`El producto ${idProd} fue eliminado del carrito con id: ${idCart}`)
                    res.redirect(`/api/carrito/${idCart}/productos`)
                }
            }
        }

        catch (error) {
            error.message = `Error al eliminar el producto: ${error.message}`
            log4js.logError(error)
            throw new Error(error)
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////

    async deleteAllProdsFromCart(idCart) {
        try {
            await cartRepo.update(idCart, [])
            log4js.logInfo(`El carrito con id: ${idCart} fue vaciado exitosamente`)
        }
        catch (error) {
            error.message = (`Error al vaciar carrito: ${error.message}`)
            log4js.logError(error)
            throw new Error(error)
        }
    }
}

module.exports = CartsControllers