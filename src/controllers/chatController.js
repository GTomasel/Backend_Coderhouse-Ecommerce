const chatRepo = new (require('../repositories/ChatRepo'))()
const MessageDto = require('../dto/MessageDto')

const log4js = require('../utils/log4js')


async function chatController(socket) {
    log4js.logInfo('User connected. ID: ' + socket.id)

    async function handleMessages() {
        try {
            const userMessages = await chatRepo.getAll()
            socket.emit('data', [userMessages, null])

            socket.on('message', msgData => {
                const newMessage = new MessageDto(msgData)
                chatRepo.save(newMessage)

                userMessages.push(newMessage)
                io.sockets.emit('data', [userMessages, null])
            })
        }
        catch (err) {
            error.message = `Error al procesar los mensajes : ${error.message}`
            log4js.logError(error)
            throw new Error(error)
        }
    }
    handleMessages()

    // const username = req.session.username
    // const userAvatar = req.session.userAvatar
    // const userCartId = req.session.email
    // res.render('chat', { username, userAvatar, userCartId, layout: 'chatMain.hbs' })
}


module.exports = chatController