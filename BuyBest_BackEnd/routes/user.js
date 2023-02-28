const express = require("express");
const { body } = require("express-validator/check");

const userController = require("../controller/user");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/list", isAuth, userController.getUseList);
router.post("/create_investor", isAuth, userController.CreateInvester);
// router.put("/update_investor", isAuth, userController.UpdateInvestor);
router.put("/update_investor", isAuth, userController.UpdateInvestor_1);


module.exports = router;
