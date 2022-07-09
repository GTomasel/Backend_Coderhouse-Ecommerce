const productsController = new (require("../controllers/productsController"))()
const log4js = require('../utils/log4js.js')


async function getAllProducts(req, res, next) {
    try {
        let allProducts = []
        const id = req.body.search
        const category = req.body.category

        if (id) {
            allProducts.push(await productsController.getById("id", id))
        } else if (category) {
            allProducts = await productsController.getAll("categoria", category)
        } else {
            allProducts = await productsController.getAll()
        }

        const query = await productsController.getAll()
        let categories = []
        for (let i = 0; i < query.length; i++) {
            categories.push(query[i].categoria)
        }
        const filteredCategories = [...new Set(categories)];

        const userData = {
            username: req.session.username,
            userAvatar: req.session.userAvatar,
            userCartId: req.session.email
        }

        if (req.session.admin == true) {
            res.render('index-admin')
        } else {
            res.render('index', { allProducts, userData, filteredCategories })
        }
    }
    catch (error) {
        error.message = `Error al cargar la página de inicio`
        log4js.logError(error)
        throw new Error(error)
    }
}


module.exports = getAllProducts