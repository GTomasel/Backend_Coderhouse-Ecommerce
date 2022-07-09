const DaoMongoDb = require("../daos/mongoDBDao")
const { PERSISTENCIA } = require('../utils/config')

function getDao(collection) {
    let dao
    switch (PERSISTENCIA) {
        case 'mongo':
            dao = new DaoMongoDb(collection)
            break
    }
    return dao
}

module.exports = getDao
