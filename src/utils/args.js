const minimist = require("minimist")
const options = { alias: { p: "PORT" } }
const args = minimist(process.argv.slice(2), options)
delete args._

module.exports = args