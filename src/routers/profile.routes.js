const { Router } = require('express')
const routerProfile = Router()
const profileController = new (require("../controllers/profileController"))()

routerProfile.get('/', profileController.getProfileInfo)
    .get('/orders', profileController.getOrders)

module.exports = routerProfile