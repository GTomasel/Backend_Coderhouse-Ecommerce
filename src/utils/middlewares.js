const log4js = require('./log4js')


const errorHandler = (error, req, res, next) => {
    log4js.logError(`Error: ${error}`)
    const errorName = `Server error`
    const errorMessage = error.message
    const firstNumber = 5
    const secondNumber = 0
    const thirdNumber = 0
    res.status(500)
    res.render('error', {
        errorName, errorMessage, firstNumber, secondNumber, thirdNumber
    })
}

const notFound = (req, res) => {
    log4js.logWarn(`La ruta ${req.originalUrl} con el método ${req.method} no está implementada`)
    const errorName = `Bad request`
    const errorMessage = `La ruta "${req.originalUrl}" no existe.`
    const firstNumber = 4
    const secondNumber = 0
    const thirdNumber = 4
    res.status(404)
    res.render('error', {
        errorName, errorMessage, firstNumber, secondNumber, thirdNumber
    })
}

const expiredSession = (req, res, next) => {
    if (!req.session.username) {
        res.set({ 'Refresh': '2; url=/login' });
        const message = `No está logueado o su sesión expiró, será redirigido al login.`
        res.render('message', {
            message
        });
    } else {
        return next()
    }
}

const isAdminCheck = (req, res, next) => {
    if (req.session.admin == false || req.session.admin == null) {
        const message = `Inicie sesion con permisos de administrador para realizar esta operacion`
        res.send(message);
    } else {
        return next()
    }
}


module.exports = { errorHandler, notFound, expiredSession, isAdminCheck }