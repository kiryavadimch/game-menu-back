const controller = require('../controllers/storeController');
const userPass = require('../../../middleware/auth')

module.exports = (router) => {
    router.get('/api/v1/user/find-store-item', userPass, controller.findStoreItem)
    router.get('/api/v1/user/buy-store-item', userPass, controller.buyStoreItem)
}
