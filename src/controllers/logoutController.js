const log4js = require('../utils/log4js')

function logout(req, res, next) {
    const username = req.session.username
    if (username === undefined) {
        res.redirect('/login')
    } else {
        req.session.destroy(error => {
            if (!error) {
                res.set({ 'Refresh': '2; url=/login' });
                const message = `Hasta luego ${username}!`
                res.render('message', {
                    message
                });
            } else {
                error.message = `Error al cerrar la sesión`
                log4js.logError(error)
                throw new Error(error)
            }
        })
    }
}

module.exports = logout