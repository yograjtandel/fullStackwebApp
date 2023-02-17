const express = require("express");
const { body } = require("express-validator/check");

const userController = require("../controller/user");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/list", isAuth, userController.getUseList);
router.post("/create_invester", isAuth, userController.CreateInvester);
router.post("/update_address", userController.UpdateAddress);
router.post("/update_bank", userController.UpdateBank);
router.post("/update_facta_detail", userController.UpdateFatcaDetail);
router.post("/update_kyc_detail", userController.UpdateKYCDetail);
router.post("/update_nominee", userController.UpdateNominee);

module.exports = router;
