const mongoose = require('mongoose');
const Promise = require('bluebird');
const fs = require('fs');
const crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');

const ObjectId = mongoose.Schema.Types.ObjectId;

const leaderboardSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ["score", "friendsScore"],
    index: true
  },
  score: {
    type: Number,
    default: 0,
    index: true
  }
});

leaderboardSchema.plugin(uniqueValidator);

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;