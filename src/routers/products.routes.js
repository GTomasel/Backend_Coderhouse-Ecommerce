const { Router } = require('express')
const routerProducts = Router()
const productsController = new (require("../controllers/productsController"))()
const { isAdminCheck } = require("../utils/middlewares")


routerProducts.post('/', isAdminCheck, productsController.add)
    .put('/', isAdminCheck, productsController.update)
    .delete('/', isAdminCheck, productsController.deleteById)


module.exports = routerProducts