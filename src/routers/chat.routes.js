const { Router } = require('express')
const routerChat = Router()


routerChat.get('/', function (req, res) {
    const userData = {
        username : req.session.username,
        userAvatar : req.session.userAvatar,
        userCartId : req.session.email,
        admin: req.session.admin == true ? true : undefined
    }
    res.render('chat', { userData, layout: 'chatMain.hbs' })
})

module.exports = routerChat
