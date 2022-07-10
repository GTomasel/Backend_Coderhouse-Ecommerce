const chatRepo = new (require('../repositories/ChatRepo'))()
const log4js = require('../utils/log4js')


async function chatController(socket) {
    try {
        console.log(`User connected ${socket.id}`)

        const allMsgs = await chatRepo.getAll()
        socket.emit('loadMessages', allMsgs)

        socket.on('chatMessage', async (msg) => {
            await chatRepo.save(msg)
            socket.broadcast.emit('chatMessage', msg)
            socket.emit('chatMessage', msg)
        })
    }
    catch (error) {
        error.message = `Error al generar la orden de compra`
        log4js.logError(error)
        throw new Error(error)
    }
}


module.exports = chatController