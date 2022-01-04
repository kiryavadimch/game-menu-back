const controller = require('../controllers/metaController');
const userPass = require('../../../middleware/auth');

module.exports = (router) => {
   router.get('/api/v1/user/get-meta', userPass, controller.getMeta);
   router.post('/api/v1/user/create-meta', userPass, controller.createMeta);
   router.delete('/api/v1/user/delete-meta', userPass, controller.deleteMeta);
   router.patch('/api/v1/user/update-meta', userPass, controller.updateMeta);
};
