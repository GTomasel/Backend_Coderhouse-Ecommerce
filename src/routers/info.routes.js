const { Router } = require('express')
const routerInfo = Router()
const showInfo = require("../controllers/infoController")
const { isAdminCheck } = require('../utils/middlewares')

routerInfo.get('/', isAdminCheck, showInfo)

module.exports = routerInfo