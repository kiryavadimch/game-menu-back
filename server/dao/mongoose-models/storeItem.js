const mongoose = require('mongoose');
const storeItemSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      img: {
         type: String,
      },
      description: {
         type: String,
      },
      price: {
         type: Number,
         required: true,
      },
      category: {
         type: String,
      }
   },
   { timestamps: true }
);

//name: , img: , description: , price: ,

const StoreItem = mongoose.model('StoreItem', storeItemSchema);

module.exports = StoreItem;
