const adminPass = require('../../../middleware/admin')
const controller = require('../../user/controllers/whoami');

module.exports = (router) => {
   router.get('/api/v1/admin/whoami', adminPass, controller.whoAmI);
}