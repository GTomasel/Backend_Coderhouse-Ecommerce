const ordersRepo = new (require('../repositories/ordersRepo'))()

const log4js = require('../utils/log4js')

class profileController {

    getProfileInfo(req, res, next) {
        const userData = {
            username: req.session.username,
            userAge: req.session.age,
            userAddress: req.session.address,
            userPhone: req.session.phone,
            userAvatar: req.session.userAvatar,
            userCartId: req.session.email
        }
        res.render('profile', { userData })
    }

    async getOrders(req, res, next) {
        const userData = {
            username: req.session.username,
            userAvatar: req.session.userAvatar,
            userCartId: req.session.email
        }
        try {
            const foundOrders = await ordersRepo.getAll("userId", userData.userCartId)
            res.render('orders', { foundOrders, userData })
        }
        catch (error) {
            error.message = (`Error al obtener las órdenes: ${error.message}`)
            log4js.logError(error)
            throw new Error(error)
        }
    }
}

module.exports = profileController

