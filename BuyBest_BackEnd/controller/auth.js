const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Auth = require("../models/auth");

exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  bcrypt
    .hash(req.body.password, 12)
    .then((hashedPw) => {
      return Auth.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: hashedPw,
        mobile: req.body.mobile,
        isd_code: "+91",
      });
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation fail");
    error.statusCode = 404;
    error.data = errors.array();
    throw error;
  }
  let LoadedUser;
  Auth.findOne({ email: req.body.email })
    .then((user) => {
      LoadedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json({
        email: LoadedUser.email,
        token: jwt.sign(
          { email: LoadedUser.email, userId: LoadedUser.id.toString() },
          "MySecret",
          { expiresIn: "30min" }
        ),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.UpdatePassword = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 12)
    .then((hashedPw) => {
      return Auth.update({ password: hashedPw }, { where: { id: req.userId } });
    })
    .then((auth) => {
        console.log(auth);
      res.json({ message: "PASSWORD is updated" });
    });
};
