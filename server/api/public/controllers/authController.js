const User = require('mongoose').models.User;
const Admin = require('mongoose').models.Admin;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('../../../configs/secret');

const generateAcessToken = (id) => {
   const payload = { id };
   return jwt.sign(payload, secret, { expiresIn: '8760h' });
};

class authController {
   async userRegister(req, res) {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res
               .status(400)
               .json({ message: 'Validation error', errors });
         }

         const { login, password } = req.body;
         const candidate = await User.findOne({ login });
         if (candidate) {
            return res.status(400).json({
               message:
                  'User with current name is already exist. Please change the name and try again.',
            });
         }

         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         const user = new User({
            login,
            password: hashedPassword,
         });
         await user.save();
         const token = generateAcessToken(user._id);

         return res.status(200).json({ token: token });
      } catch (e) {
         console.log(e);
         res.status(500).json({
            message: 'Internal error',
         });
      }
   }

   async adminRegister(req, res) {
      try {
         if (req.headers['secretkey'] != '12345') {
            return res
               .status(400)
               .json({ message: 'Invalid secret key', errors });
         }
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res
               .status(400)
               .json({ message: 'Validation error', errors });
         }

         const { login, password } = req.body;
         const candidate = await Admin.findOne({ login });
         if (candidate) {
            return res.status(400).json({
               message:
                  'User with current name is already exist. Please change the name and try again.',
            });
         }

         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);

         const admin = new Admin({
            login,
            password: hashedPassword,
         });
         await admin.save();
         const token = generateAcessToken(admin._id);

         return res.status(200).json({ token: token });
      } catch (e) {
         console.log(e);
         res.status(500).json({
            message: 'Internal error',
         });
      }
   }


   // let hashPassword = async function (password, rounds = 10) {
   //    try {
   //      return await bcrypt.hash(password, rounds);
   //    } catch (e) {
   //      console.log(e);
   //      throw new Error("Failed at password hashing");
   //    }



   async userLogin(req, res) {
      try {
         const { login, password } = req.body;
         let user = await User.findOne({ login });
         if (!user) {
            res.status(400).json({ message: `User ${login} not found` });
         }

         const validPassword = await bcrypt.compare(password, user.password);
         if (!validPassword) {
            res.status(400).json({ message: 'Wrong password!' });
         }
         const token = generateAcessToken(user._id);
         return res.status(200).json({ token: token });
      } catch (e) {
         console.log(e);
         res.status(500).json({
            message: 'Internal error',
         });
      }
   }

   async adminLogin(req, res) {
      try {
         const { login, password } = req.body;
         let admin = await Admin.findOne({ login });
         if (!admin) {
            res.status(400).json({ message: `Admin ${login} not found` });
         }

         const validPassword = await bcrypt.compare(password, admin.password);
         if (!validPassword) {
            res.status(400).json({ message: 'Wrong password!' });
         }
         const token = generateAcessToken(admin._id);
         return res.status(200).json({ token: token });
      } catch (e) {
         console.log(e);
         res.status(500).json({
            message: 'Internal error',
         });
      }
   }
}

module.exports = new authController();
