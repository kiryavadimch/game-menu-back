const User = require('mongoose').models.User 
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
      const user = await User.findOne({_id:id}, '-password -__v')
      if (!user) {
         return res
            .status(403)
            .json({ message: 'User does not have sufficient permissions' });
      }
      req.user = user
      next();
   } catch (e) {
      console.log(e);
      res.status(500).json({message:'Internal error'});
   }
};
