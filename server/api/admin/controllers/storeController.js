const StoreItem = require('mongoose').models.StoreItem;

class storeConstroller {
   async addStoreItem(req, res) {
      try {
         let storeItem = new StoreItem({
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
         });

         const result = await storeItem.save();
         res.status(200).json({ data: result });
      } catch (e) {
         console.log(e);
         let errorInfo = e;
         if (errorInfo.name === 'ValidationError') {
            return res.status(409).json({ message: errorInfo.message });
         }
         return res.status(500).json({ message: e.message });
      }
   }

   async editStoreItem(req, res) {
      try {
         const store = await StoreItem.findById(req.body.itemId);
         store.set(req.body);
         const result = await store.save();
         res.status(200).json({ data: result });
      } catch (e) {
         console.log(e);
         let errorInfo = e;
         if (errorInfo.name === 'ValidationError') {
            return res.status(409).json({ message: errorInfo.message });
         }
         return res.status(500).json({ message: e.message });
      }
   }

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

   async deleteStoreItem(req, res) {
      try {
         const data = await StoreItem.deleteOne({ _id: req.body.id });
         res.status(200).json({ success: true });
      } catch (err) {
         console.log(err);
         let errorInfo = err;
         if (errorInfo.name === 'ValidationError') {
            return res.status(409).json({ message: errorInfo.message });
         }
         return res.status(500).json({ message: err.message });
      }
   }
}

module.exports = new storeConstroller();
