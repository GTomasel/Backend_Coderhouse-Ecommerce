const { Router } = require('express')
const routerLogin = Router()
const passport = require('../controllers/passportController')
const loginController = require("../controllers/loginController")


routerLogin.get('/', loginController.getLogin);
routerLogin.post('/', passport.authenticate('login', { failureRedirect: '/login/fail' }), loginController.postLogin);
routerLogin.get('/fail', loginController.getFaillogin);

module.exports = routerLogin