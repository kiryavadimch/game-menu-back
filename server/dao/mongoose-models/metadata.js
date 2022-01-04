const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metaSchema = new Schema(
   {
      id: {
         type: String,
         index: true,
         // required: true,
         unique: true,
      },
      data: {
         type: Object,
         // required: true,
      },
   },
   { timestamps: true }
);

const Meta = mongoose.model('Meta', metaSchema);
module.exports = Meta;