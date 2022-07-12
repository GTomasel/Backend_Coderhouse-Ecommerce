const cartsController = new (require('./cartsController'))()
const ordersRepo = new (require('../repositories/OrdersRepo'))()
const nodemailer = require('nodemailer')
const twilio = require('twilio')
const config = require('../utils/config')
const log4js = require('../utils/log4js')


function checkout(req, res, next) {

    async function generateNewOrder() {
        const idCart = req.session.email
        try {
            const newOrder = {}
            newOrder.userId = req.session.email
            newOrder.productos = req.session.userCartContent
            const orderId = await ordersRepo.save(newOrder)

            sendCheckoutMail(req.session.userCartContent, orderId)
            sendWhatsappMsg(orderId)
            await cartsController.deleteAllProdsFromCart(idCart)

            res.set({ 'Refresh': '2; url=/index' });
            const message = `Su pedido se encuentra en proceso con el número de orden: "${orderId}", gracias por comprar!`
            res.render('message', {
                message
            });
        }
        catch (error) {
            error.message = `Error al generar la orden de compra`
            log4js.logError(error)
            throw new Error(error)
        }
    }
    generateNewOrder()

    async function sendCheckoutMail(userCartContent, orderId) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.adminMailCredentials.adminMail,
                pass: config.adminMailCredentials.adminMailPass
            }
        });

        const mailOptions = {
            from: 'App Ecommerce Backend Coderhouse',
            to: req.session.email,
            subject: `Nuevo pedido de ${req.session.username} "${req.session.email}"`,
            html: `<h3 style="">Detalle de su pedido: orden número "${orderId}"</h3>
                    <table class="gmail-table" style="border: solid 2px #DDEEEE;border-collapse: collapse;border-spacing: 0;font: normal 14px Roboto, sans-serif;">
                        <thead>
                        <tr>
                            <th scope="col" style="background-color: #c8e6f5;border: solid 1px #DDEEEE;color: #0082c1;padding: 10px;text-align: left;text-shadow: 1px 1px 1px #fff;">ID</th>
                            <th scope="col" style="background-color: #c8e6f5;border: solid 1px #DDEEEE;color: #0082c1;padding: 10px;text-align: left;text-shadow: 1px 1px 1px #fff;">Nombre</th>
                            <th scope="col" style="background-color: #c8e6f5;border: solid 1px #DDEEEE;color: #0082c1;padding: 10px;text-align: left;text-shadow: 1px 1px 1px #fff;">Descripcion</th>
                            <th scope="col" style="background-color: #c8e6f5;border: solid 1px #DDEEEE;color: #0082c1;padding: 10px;text-align: left;text-shadow: 1px 1px 1px #fff;">Codigo</th>
                            <th scope="col" style="background-color: #c8e6f5;border: solid 1px #DDEEEE;color: #0082c1;padding: 10px;text-align: left;text-shadow: 1px 1px 1px #fff;">Precio</th>
                            <th scope="col" style="background-color: #c8e6f5;border: solid 1px #DDEEEE;color: #0082c1;padding: 10px;text-align: left;text-shadow: 1px 1px 1px #fff;">Cantidad</th>
                        </tr>
                        </thead>
                        <tbody>
                        ${userCartContent.map(prod => `
                        <tr>
                            <th scope="row">${prod.id}</th>
                            <td style="border: solid 1px #DDEEEE;color: #333;padding: 10px;text-shadow: 1px 1px 1px #fff;">${prod.nombre}</td>
                            <td style="border: solid 1px #DDEEEE;color: #333;padding: 10px;text-shadow: 1px 1px 1px #fff;">${prod.descripcion}</td>
                            <td style="border: solid 1px #DDEEEE;color: #333;padding: 10px;text-shadow: 1px 1px 1px #fff;">${prod.codigo}</td>
                            <td style="border: solid 1px #DDEEEE;color: #333;padding: 10px;text-shadow: 1px 1px 1px #fff;">$${prod.precio}</td>
                            <td style="border: solid 1px #DDEEEE;color: #333;padding: 10px;text-shadow: 1px 1px 1px #fff;">${prod.qty} u.</td>
                        </tr>`).join('')}                          
                        </tbody>
                    </table>               
                    <br>
                    <p>**Correo enviado desde el servidor de backend Coder Market - Gabriel Tomasel**</p>`
        }
        try {
            await transporter.sendMail(mailOptions)
        } catch (error) {
            error.message = `Error al enviar el correo electrónico`
            log4js.logError(error)
            throw new Error(error)
        }
    }

    async function sendWhatsappMsg(orderId) {
        const accountSid = config.twilio.twilioAccountSid
        const authToken = config.twilio.twilioAccountToken
        const client = twilio(accountSid, authToken)
        try {
            await client.messages.create({
                body: `Nuevo pedido de ${req.session.username} "${req.session.email}", número de operación "${orderId}"\n*Backend Coderhouse Ecommerce App*`,
                from: `whatsapp:${config.twilio.twilioWspPhoneNumber}`,
                to: `whatsapp:${req.session.phone}`
            })
        } catch (error) {
            error.message = `Error al enviar el mensaje de Whatsapp`
            log4js.logError(error)
            throw new Error(error)
        }
    }
}

module.exports = checkout