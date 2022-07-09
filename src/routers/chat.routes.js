const { Router } = require('express')
const routerChat = Router()
//const chatController = new (require("../controllers/chatController"))()


routerChat.get('/', function (req, res) {
    const username = req.session.username
    const userAvatar = req.session.userAvatar
    const userCartId = req.session.userCartId
    res.render('chat', { username, userAvatar, userCartId, layout: 'chatMain.hbs' })
})

module.exports = routerChat
