const controller = require('../controllers/recordController');
const userPass = require('../../../middleware/auth');

module.exports = (router) => {
   router.get('/api/v1/user/my-records', userPass, controller.getRecords);
   router.get('/api/v1/user/top-records', userPass, controller.topRecord);
   router.post('/api/v1/user/post-record', userPass, controller.postRecord);
};
