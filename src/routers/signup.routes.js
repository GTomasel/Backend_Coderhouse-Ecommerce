const { Router } = require('express')
const routerSignup = Router()
const passport = require('../controllers/passportController')
const signupController = require("../controllers/signupController")

routerSignup.get('/', signupController.getSignup)
routerSignup.post('/', passport.authenticate('signup', { failureRedirect: '/signup/failsignup' }), signupController.postSignup)
routerSignup.get('/failsignup', signupController.getFailsignup)

module.exports = routerSignup