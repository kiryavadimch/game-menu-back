const Meta = require('mongoose').models.Meta;

class metaController {
   async createMeta(req, res) {
      try {
         const meta = new Meta({
            id: req.body.id,
            data: req.body.data,
         });
         const data = await meta.save();
         res.status(200).json({ data: data });
      } catch (e) {
         console.log(e);
         let errorInfo = e;
         if (errorInfo.name === 'ValidationError') {
            return res.status(409).json({ message: errorInfo.message });
         }
         return res.status(500).json({ message: e.message });
      }
   }

   async getMeta(req, res) {
      try {
         const data = await Meta.findOne({ id: req.query.id });
         res.status(200).json({ data: data });
      } catch (e) {
         console.log(e);
         let errorInfo = e;
         if (errorInfo.name === 'ValidationError') {
            return res.status(409).json({ message: errorInfo.message });
         }
         return res.status(500).json({ message: e.message });
      }
   }

   async updateMeta(req, res) {
      try {
         const data = await Meta.update(
            { id: req.body.id },
            { $set: { id: req.body.id, data: req.body.data } }
         );
         res.status(200).json({ data: data });
      } catch (e) {
         console.log(e);
         let errorInfo = e;
         if (errorInfo.name === 'ValidationError') {
            return res.status(409).json({ message: errorInfo.message });
         }
         return res.status(500).json({ message: e.message });
      }
   }

   async deleteMeta(req, res) {
      try {
         const data = await Meta.deleteOne({ id: req.body.id });
         res.status(200).json({ success: true });
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

module.exports = new metaController();
