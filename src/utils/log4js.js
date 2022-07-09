const log4js = require('log4js')
const logger = log4js.getLogger()
const loggerWarn = log4js.getLogger('appWarning')
const loggerError = log4js.getLogger('internalError')

log4js.configure({
    appenders: {
        loggerConsole: { type: 'console' },
        loggerFileWarn: { type: 'file', filename: 'warn.log' },
        loggerFileError: { type: 'file', filename: 'error.log' }
    },
    categories: {
        default: { appenders: ['loggerConsole'], level: 'info' },
        appWarning: { appenders: ['loggerConsole', 'loggerFileWarn'], level: 'warn' },
        internalError: { appenders: ['loggerConsole', 'loggerFileError'], level: 'error' }
    }
})

const logInfo = (message) => {
    if (process.env.NODE_ENV == 'PROD') {
        logger.info(message)
    }
}

const logWarn = (message) => {
    loggerWarn.warn(message)
}

const logError = (error) => {
    loggerError.error(`Error: ${error}`)
}


module.exports = { logInfo, logError, logWarn }