const Admin = require('mongoose').models.Admin
const jwt = require('jsonwebtoken');
const { secret } = require('../configs/secret');

module.exports = async function (req, res, next) {
   if (req.method === 'OPTIONS') {
      next();
   }

   try {
      const token = req.headers.authorization.split(' ')[1];
      
      if (!token) {
         res.status(403).json({ message: 'User is not logged in' });
      }

      const {id:id} = jwt.verify(token, secret);
      const admin = await Admin.findOne({_id:id},'-password -__v')
      if (!admin) {
         return res
            .status(403)
            .json({ message: 'User does not have sufficient permissions' });
      }
      req.user = admin
      next();
   } catch (e) {
      console.log(e);
      res.status(403).json({ message: e});
   }
};
