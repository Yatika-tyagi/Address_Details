var express = require('express'); // Making Object Of Express
var router = express.Router(); // Using Routing Function of Express
var admin = require('../../controllers/admin');


/*
ADMIN APIs Start
*/

router.route('/addAddress')
  .post(admin.addNewAddress)

router.route('/deleteAddress')
  .delete(admin.deleteAddress)

router.route('/updateAddress')
  .put(admin.updateAddress)

router.route('/AddressList')
  .get(admin.getAddress)
/*
ADMIN APIs End
*/


module.exports = router; // Exporting router
