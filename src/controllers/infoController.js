const config = require('../utils/config')

async function showInfo(req, res, next) {
    const info = {
        args: config.args.value == undefined ? 'n/a' : config.args,
        platform: process.platform,
        numCPUs: config.numCPUs,
        nodeVersion: process.version,
        reservedMemory: process.memoryUsage().rss,
        execPath: process.execPath,
        processId: process.pid,
        projectFolder: process.cwd()
    }
    res.render('info', { info })
}


module.exports = showInfo