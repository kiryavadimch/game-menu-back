const StoreItem = require('mongoose').models.StoreItem;
const User = require('mongoose').models.User;
const Promise = require('bluebird');

class storeController{
    
   async findStoreItem(req, res) {
      try {
         let validSortDirections = {
            asc: 1,
            desc: -1,
         };
         let sortBy = req.query.sortBy;
         if (!validSortDirections[req.query.sortDirection]) {
            return res
               .status(400)
               .json({ message: 'Invalid sort direction provided' });
         }

         let { name } = req.query;
         let items = {};
         if (!name) {
            items = await StoreItem.find({})
               .sort({ [sortBy]: req.query.sortDirection })
               .limit(+req.query.limit)
               .skip(+req.query.skip);

            return res.status(200).json({ data: items });
         }
         items = await StoreItem.find({
            name: { $regex: req.query.name, $options: 'i' },
         })
            .sort({ [sortBy]: req.query.sortDirection })
            .limit(+req.query.limit)
            .skip(+req.query.skip);

         res.status(200).json({ data: items });
      } catch (e) {
         console.log(e);
         let errorInfo = e;
         if (errorInfo.name === 'ValidationError') {
            return res.status(409).json({ message: errorInfo.message });
         }
         return res.status(500).json({ message: e.message });
      }
   }

    async buyStoreItem(req, res){
        try {
            let [user, item] = await Promise.all([
               User.findById(req.query.user),
               StoreItem.findById(req.query.item)
               ])
            console.log(user)
            if (user.wallet < item.price) {
               return res
                  .status(409)
                  .json({ message: 'User has insufficient funds' });
            }
            user.wallet -= item.price

            user.inventory.push(item)
            await user.save()

            res.status(200).json({success: true});
         } catch (e) {
            console.log(e);
            let errorInfo = e;
            if (errorInfo.name === 'ValidationError') {
               return res.status(409).json({ message: errorInfo.message });
            }
            return res.status(500).json({ message: e.message });
         }
    }
}

module.exports = new storeController();
