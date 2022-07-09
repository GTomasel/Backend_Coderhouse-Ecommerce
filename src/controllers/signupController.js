const cartsController = new (require('./cartsController'))()
const nodemailer = require('nodemailer')
const config = require('../utils/config')
const countryCodes = require('../utils/countryCodes')
const log4js = require('../utils/log4js')


function getSignup(req, res) {
    res.render('signup', { countryCodes })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

async function postSignup(req, res) {
    req.session.username = req.user.username
    req.session.email = req.user.email
    req.session.phone = req.user.phone
    req.session.userAvatar = req.user.avatar
    req.session.userCartId = await cartsController.addCart(req.user.email)
    sendSignupMail()
    res.redirect('/index')


    async function sendSignupMail() {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.adminMailCredentials.adminMail,
                pass: config.adminMailCredentials.adminMailPass
            }
        });

        const mailOptions = {
            from: 'Servidor Node.js Backend Coderhouse',
            to: config.newSigupNotificationMail,
            subject: 'Nuevo registro',
            html: `<h3 style="">Datos del nuevo usuario:</h3>
                   <ul>
                        <li>Nombre: ${req.user.username}</li>
                        <li>Email: ${req.user.email}</li>
                        <li>Direccion: ${req.user.address}</li>
                        <li>Edad: ${req.user.age}</li>
                        <li>Teléfono: ${req.user.phone}</li>
                        <li>Avatar: ${req.user.avatar}</li>
                   </ul>
                   <br>
                   <p>**Correo enviado desde el servidor de backend de CoderHouse - 3ra preentrega Gabriel Tomasel**</p>`
        }
        try {
            await transporter.sendMail(mailOptions)
        } catch (error) {
            log4js.logError(error)
        }
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFailsignup(req, res) {
    log4js.logInfo('Signup error')
    res.set({ 'Refresh': '2; url=/signup' });
    const message = `Error al registrarse, intente nuevamente... `
    res.render('message', {
        message
    });
}

module.exports = {
    getSignup,
    postSignup,
    getFailsignup
}