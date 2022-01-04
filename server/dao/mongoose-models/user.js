const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   login: {
      type: String,
      unique: true,
   },
   exp: {
      type: Number,
      default: 0,
      min: 0
   },
   inventory: [
      {
         type: mongoose.Types.ObjectId,
         ref: 'StoreItem',
      },
   ],
   wallet: {
      type: Number,
      default: 0,
      min: 0,
   },
   password: {
      type: String,
      required:true,
   },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
