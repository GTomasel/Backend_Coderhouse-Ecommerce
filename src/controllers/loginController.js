const log4js = require('../utils/log4js')

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/index')
    }
    else {
        res.render('login')
    }
}

function postLogin(req, res) {
    req.session.username = req.user.username
    req.session.email = req.user.email
    req.session.phone = req.user.phone
    req.session.age = req.user.age
    req.session.address = req.user.address
    req.session.userAvatar = req.user.avatar
    req.session.admin = req.user.admin
    res.redirect('/index')
}

function getFaillogin(req, res) {
    log4js.logInfo('Login error')
    res.set({ 'Refresh': '2; url=/login' });
    const message = `Error al loguearse, verifique sus datos e intente nuevamente...`
    res.render('message', {
        message
    });
}

module.exports = {
    getLogin,
    postLogin,
    getFaillogin
}