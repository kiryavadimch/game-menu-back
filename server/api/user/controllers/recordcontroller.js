const Leaderboard = require('mongoose').models.Leaderboard;
const Promise = require('bluebird');

class recordController {
   getRecords(req, res) {
      let type = req.query.type || 'score';
      return Leaderboard.findOne({ type: type, user: req.user._id })
         .then((record) => {
            return Leaderboard.count({
               type: type,
               score: { $gt: record.score },
            }).then((count) => {
               return res.status(200).json({
                  score: record.score,
                  position: count + 1,
               });
            });
         })
         .catch((err) => {
            console.log(err);
            let errorInfo = err;
            if (errorInfo.name === 'ValidationError') {
               return res.status(409).json({ message: errorInfo.message });
            }
            return res.status(500).json({ message: err.message });
         });
   }

   postRecord(req, res) {
      let type = req.body.type;
      let results = req.body.results;
      let users = results.map((item) => item.id);
      return Leaderboard.find({ user: { $in: users }, type: type })
         .then((users) => {
            let promises = [];
            for (let i = 0; i < results.length; i++) {
               let recordFound = false;
               for (let j = 0; j < users.length; j++) {
                  if (results[i].id === users[j].user.toString()) {
                     recordFound = users[j];
                  }
               }
               if (recordFound) {
                  recordFound.score += results[i].score;
                  promises.push(recordFound.save());
               } else {
                  let newRecord = new Leaderboard({
                     type: type,
                     user: results[i].id,
                     score: results[i].score,
                  });
                  promises.push(newRecord.save());
               }
            }
            return Promise.all(promises).then((results) => {
               return res.status(200).json({ data: results });
            });
         })
         .catch((err) => {
            console.log(err);
            let errorInfo = err;
            if (errorInfo.name === 'ValidationError') {
               return res.status(409).json({ message: errorInfo.message });
            }
            return res.status(500).json({ message: err.message });
         });
   }

   topRecord(req, res) {
      let type = req.query.type || 'score';
      let limit = parseInt(req.query.limit) || 10;
      return Leaderboard.find({ type: type })
         .limit(limit)
         .sort({ score: -1 })
         .populate('user', 'login')
         .then((items) => {
            let records = JSON.parse(JSON.stringify(items));
            for (let i = 0; i < records.length; i++) {
               records[i].user = records[i].user.login;
            }
            return res.status(200).json({ data: records });
         })
         .catch((err) => {
            console.log(err);
            let errorInfo = err;
            if (errorInfo.name === 'ValidationError') {
               return res.status(409).json({ message: errorInfo.message });
            }
            return res.status(500).json({ message: err.message });
         });
   }
}

module.exports = new recordController();
