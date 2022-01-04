const userPass = require('../../../middleware/auth')
const controller = require('../controllers/whoami');

module.exports = (router) => {
   router.get('/api/v1/user/whoami', userPass, controller.whoAmI);
}