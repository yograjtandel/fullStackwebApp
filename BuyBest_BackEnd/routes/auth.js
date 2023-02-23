const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

const Auth = require("../models/auth");

const authController = require("../controller/auth");

router.post(
  "/signup",
  [
    body("user_name").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .withMessage("Please enter valid email.")
      .custom((value, { req }) => {
        return Auth.findOne({ where: { email: value } }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail is already exists!");
          }
        });
      })
      .normalizeEmail(),
  ],
  authController.createUser
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter valid email.")
      .custom((value, { req }) => {
        return Auth.findOne({ where: { email: value } }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject(
              "Account with this email does not exist, please Sign-up!"
            );
          }
        });
      })
      .normalizeEmail(),
    body("password").not().isEmpty(),
  ],
  authController.login
);

router.post("/update_password", isAuth, authController.UpdatePassword);
router.post("/update_refreshtoken", isAuth, authController.UpdateRefreshToken);

module.exports = router;
