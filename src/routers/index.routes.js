const { Router } = require('express')
const routerIndex = Router()
const indexController = require("../controllers/indexController")


routerIndex.get('/', indexController)
    .post('/', indexController)

module.exports = routerIndex