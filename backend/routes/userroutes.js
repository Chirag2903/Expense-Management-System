const express = require("express");
const { registeruser, loginuser, addtransaction, getuserinfo, deletetransaction, isauthenticateduser, logout } = require("../controller.js/usercontroller");
const router = express.Router();

router.route('/signup').post(registeruser);
router.route('/login').post(loginuser);
router.route('/:id').get(isauthenticateduser, getuserinfo);
router.route('/add-transaction/:id').post(isauthenticateduser, addtransaction)
router.route("/delete-transaction/:id/:transactionId").delete(isauthenticateduser, deletetransaction)
router.route('/logout').post(logout);

module.exports = router;