const controller = require('../controllers/storeController');
const adminPass = require('../../../middleware/admin');

module.exports = (router) => {
   router.post(
      '/api/v1/admin/add-store-item',
      adminPass,
      controller.addStoreItem
   );
   router.patch(
      '/api/v1/admin/edit-store-item',
      adminPass,
      controller.editStoreItem
   );
   router.get(
      '/api/v1/admin/find-store-item',
      adminPass,
      controller.findStoreItem
   );
   router.delete(
      '/api/v1/admin/delete-store-item',
      adminPass,
      controller.deleteStoreItem
   );
};
