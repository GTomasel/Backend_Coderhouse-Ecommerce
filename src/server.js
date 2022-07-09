require('dotenv').config({ path: `${process.env.NODE_ENV}.env` })

const express = require('express')
const session = require('express-session')
const app = express()
const { Server: HttpServer } = require('http')
//const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
//const io = new IOServer(httpServer)

const handlebars = require('express-handlebars')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser');
const cluster = require('cluster')
const path = require('path');
const methodOverride = require('method-override');

const passport = require('./controllers/passportController');
const config = require('./utils/config')
const dbController = require('./db/mongoDb')
const middlewares = require("./utils/middlewares")
//const webSocketChat = require('./controllers/chatController')
const log4js = require('./utils/log4js')


if (cluster.isPrimary && config.mode === 'cluster') {
    log4js.logInfo(`Server listening on port ${config.PORT}`)
    log4js.logInfo(`Primary ${process.pid} is running`)

    for (let i = 0; i < config.numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        log4js.logWarn(`worker ${worker.process.pid} died`)
        cluster.fork()
    })

} else {
    app.use(express.json())
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(methodOverride('_method'))

    app.use(session({
        store: MongoStore.create({
            mongoUrl: config.URL_BASE_DE_DATOS,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
        }),
        secret: 'sarasa sasa',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: config.TIEMPO_EXPIRACION
        }
    }))

    app.use(passport.initialize());
    app.use(passport.session());

    app.engine('hbs', handlebars({
        allowProtoPropertiesByDefault: 'true',
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    app.set('views', path.join(__dirname, '/views'))
    app.set('view engine', 'hbs')

    const routerLogin = require("../src/routers/login.routes")
    const routerSignup = require("../src/routers/signup.routes")
    const routerLogout = require("../src/routers/logout.routes")
    const routerIndex = require("../src/routers/index.routes")
    const routerInfo = require("./routers/info.routes")
    const routerProducts = require("../src/routers/products.routes")
    const routerCart = require("../src/routers/carts.routes")
    const routerCheckout = require("../src/routers/checkout.routes")
    const routerProfile = require("../src/routers/profile.routes")
    //const routerChat = require("../src/routers/chat.routes")

    app.get('/', function (req, res) {
        res.redirect('/login')
    })
    app.use('/login', routerLogin)
    app.use('/signup', routerSignup)
    
    app.use(middlewares.expiredSession)
    
    app.use('/logout', routerLogout)
    app.use('/index', routerIndex)
    app.use('/info', routerInfo)
    app.use('/api/productos', routerProducts)
    app.use('/api/carrito', routerCart)
    app.use('/checkout', routerCheckout)
    app.use('/profile', routerProfile)
    //app.use('/chat', routerChat)

    app.use(middlewares.errorHandler)
    app.use(middlewares.notFound)

    dbController.conectarMongoDB(config.URL_BASE_DE_DATOS, err => {
        if (err) return log4js.logError(`error en conexión de base de datos, ${err.message}`)
        log4js.logInfo('BASE DE DATOS CONECTADA')
    })


    // const Repository = require('./repositories/ChatRepo')
    // const repo = new Repository()
    // const MessageDto = require('./dto/MessageDto')

    // io.on('connection', (socket) => {
    //     log4js.logInfo('User connected. ID: ' + socket.id)

    //     async function handleMessages() {
    //         try {
    //             const userMessages = await repo.getAll()
    //             socket.emit('data', [userMessages, null])

    //             socket.on('message', msgData => {
    //                 const newMessage = new MessageDto(msgData)
    //                 repo.save(newMessage)

    //                 userMessages.push(newMessage)
    //                 io.sockets.emit('data', [userMessages, null])
    //             })
    //         }
    //         catch (err) {
    //             error.message = `Error al procesar los mensajes : ${error.message}`
    //             log4js.logError(error)
    //             throw new Error(error)
    //         }
    //     }
    //     handleMessages()
    // })

    const server = httpServer.listen(config.PORT, () => { })

    if (config.mode === 'fork' || config.mode === 'undefined') {
        log4js.logInfo(`Server listening on port ${config.PORT}`)
    }
    log4js.logInfo(`Worker ${process.pid} started`)

    server.on("error", (error) => {
        log4js.logError(`Server error: ${error.message}`)
        throw new Error(`Error interno del servidor`)
    })
}
