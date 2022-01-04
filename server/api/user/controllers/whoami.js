class whoAmIConstroller {
    
   async whoAmI(req,res){
      try {
            let userData = req.user
            res.status(200).json({userData})
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

module.exports = new whoAmIConstroller()