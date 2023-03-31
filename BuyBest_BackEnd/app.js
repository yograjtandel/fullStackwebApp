const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const mfRoutes = require("./routes/MFData");

const sequelize = require("./util/database");

const Address = require("./models/address");
const Auth = require("./models/auth");
const Bank = require("./models/bank");
const FatcaDetail = require("./models/fatca_detail");
const KYCDetail = require("./models/kyc_detail");
const Nominee = require("./models/nominee");
const User = require("./models/user");
const RefreshToken = require("./models/refreshToken");
const AMC = require("./models/AMC");
const Funds = require("./models/funds");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/mf", mfRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

Auth.hasOne(RefreshToken);
RefreshToken.belongsTo(Auth);
Auth.hasOne(User);
User.belongsTo(Auth);
Auth.hasOne(Address);
Address.belongsTo(Auth);
Auth.hasMany(Bank);
Bank.belongsTo(Auth);
Auth.hasOne(FatcaDetail);
FatcaDetail.belongsTo(Auth);
Auth.hasOne(KYCDetail);
KYCDetail.belongsTo(Auth);
Auth.hasMany(Nominee);
Nominee.belongsTo(Auth);
AMC.hasOne(Funds);
Funds.belongsTo(AMC);

sequelize
  .sync()
  .then((res) => {
    app.listen(PORT, () => console.log("app is runing on port=" + PORT));
  })
  .catch((err) => {
    console.log(err);
  });
