const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/authConfig");
const Auth = require("../models/auth");
const RefreshToken = require("../models/refreshToken");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: { api_key: config.MailApiKey },
  })
);

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
      transport
        .sendMail({
          to: req.body.email,
          from: "yograjtandel9@gmail.com",
          subject: "Greetings",
          html: "welcome to Temp MF",
        })
        .then((res1) => {
          console.log(res1);
        })
        .catch((err) => {
          console.log(err);
        });
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

      const getRefreshToken = async () => {
        const refresh_tokn = await RefreshToken.createToken(LoadedUser);
        const token = {
          access: jwt.sign(
            { email: LoadedUser.email, userId: LoadedUser.id.toString() },
            config.jwtConfig.secret,
            { expiresIn: config.jwtConfig.jwtExpiration }
          ),
          refresh: refresh_tokn,
        };

        res.status(200).json({
          email: LoadedUser.email,
          token: token,
        });
      };
      getRefreshToken();
      //   const refresh_tokn = RefreshToken.createToken(LoadedUser).then((token) => {
      //     return token;
      //   });
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
      res.json({ message: "PASSWORD is updated" });
    });
};

exports.UpdateRefreshToken = (req, res, next) => {
  RefreshToken.verifyExpiration(req.userId).then((responce) => {
    if (responce.validity) {
      Auth.findOne({ where: { id: req.userId } }).then((userDoc) => {
        const token = {
          access: jwt.sign(
            { email: userDoc.email, userId: userDoc.id.toString() },
            config.jwtConfig.secret,
            { expiresIn: config.jwtConfig.jwtExpiration }
          ),
          refresh: req.body.refresh,
        };
        res.status(200).json({
          email: userDoc.email,
          token: token,
        });
      });
    }
  });
};
