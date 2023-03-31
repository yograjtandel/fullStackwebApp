const express = require("express");
const isAuth = require("../middleware/isAuth");
const mfcontroller = require("../controller/fetchMFData");

const router = express.Router();

router.get("/amc", mfcontroller.getAMCList);
router.get("/fund", mfcontroller.CreateFunds);
router.get("/funds", mfcontroller.GetFunds);

module.exports = router;
