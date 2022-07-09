const { Router } = require('express')
const routerLogout = Router()
const logoutController = require('../controllers/logoutController')

routerLogout.get('/', logoutController)

module.exports = routerLogout