const { Router } = require('express')
const routerCart = Router()
const cartsController = new (require("../controllers/cartsController"))()

routerCart.post('/', cartsController.addCart)
    .delete('/:id', cartsController.deleteCart)
    .get('/:id/productos', cartsController.getCartProdsFromId)
    .post('/:id/productos/:id_prod?', cartsController.addProdsToCartId)
    .delete('/:id/productos/:id_prod', cartsController.deleteProdFromCart)


module.exports = routerCart