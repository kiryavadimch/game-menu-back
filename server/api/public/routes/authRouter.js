const controller = require('../controllers/authController');
const { check } = require('express-validator');

module.exports = (router) => {
   router.post(
      '/api/v1/user-register',
      [
         check('login', 'Empty user name!').notEmpty(),
         check('password', 'Password must be longer than 7 and less than 312').isLength({min:8, max: 312}),
      ],
      controller.userRegister
   );
   router.post(
      '/api/v1/admin-register',
      [
         check('login', 'Empty user name!').notEmpty(),
         check('password', 'Password must be longer than 7 and less than 312').isLength({min:8, max: 312}),
      ],
      controller.adminRegister
   );
   router.post('/api/v1/user-login', controller.userLogin);
   router.post('/api/v1/admin-login', controller.adminLogin);
   
};
