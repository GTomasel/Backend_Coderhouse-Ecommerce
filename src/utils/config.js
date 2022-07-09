const args = require("./args")

module.exports = {
    PORT: process.env.PORT || args.PORT || 8080,
    numCPUs: require('os').cpus().length,
    PERSISTENCIA: 'mongo',
    mode: args.mode || 'cluster',
    TIEMPO_EXPIRACION: 1800000,
    URL_BASE_DE_DATOS: process.env.URL_BASE_DE_DATOS,
    adminMailCredentials: {
        adminMail: process.env.adminMail,
        adminMailPass: process.env.adminMailPass
    },
    twilio: {
        twilioAccountSid: process.env.twilioAccountSid,
        twilioAccountToken: process.env.twilioAccountToken,
        twilioWspPhoneNumber: process.env.twilioWspPhoneNumber
    },
    newSigupNotificationMail: process.env.newSigupNotificationMail,
    args
}



