const { Router } = require('express')
const routerCheckout = Router()
const checkoutController = require("../controllers/checkoutController")


routerCheckout.get('/', checkoutController)

module.exports = routerCheckout