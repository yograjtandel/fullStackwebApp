const Auth = require("../models/auth");
const User = require("../models/user");
const Address = require("../models/address");
const Bank = require("../models/bank");
const FatcaDetail = require("../models/fatca_detail");
const KYCDetail = require("../models/kyc_detail");
const Nominee = require("../models/nominee");

exports.getUseList = (req, res) => {
  console.log("get list called");
  KYCDetail.findAll()
    .then((data) => {
      if (!data) {
        const error = new Error("No user Found");
        error.statusCode = 404;
        throw error;
      }
      console.log(data);
      res.json({ users: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.CreateInvester = (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error("Validation failed.");
  //   error.statusCode = 422;
  //   error.data = errors.array();
  //   throw error;
  // }
  Auth.findOne({ where: { id: req.userId } }).then((userDoc) => {
    User.create({
      perm_addr_is_corres_addr: req.body.perm_addr_is_corres_addr,
      skip_nomination: req.body.skip_nomination,
    }).then((user) => userDoc.setUser(user));

    Address.create({
      line1: req.body.correspondence_address.line1,
      city: req.body.correspondence_address.city,
      state: req.body.correspondence_address.state,
      pincode: req.body.correspondence_address.pincode,
      country_ansi_code: "IN",
    }).then((address) => userDoc.setAddress(address));

    const bank_accounts = req.body.bank_accounts.map((bank_account) => {
      return Bank.create({
        number: bank_account.number,
        primary_account: bank_account.primary_account,
        type: bank_account.type,
        ifsc_code: bank_account.ifsc_code,
      }).then((bank) => userDoc.setBanks(bank));
    });

    FatcaDetail.create({
      country_of_birth_ansi_code: "IN",
      no_other_tax_residences: true,
      source_of_wealth: req.body.fatca_detail.source_of_wealth,
      gross_annual_income: req.body.fatca_detail.gross_annual_income,
    }).then((fatca_detail) => userDoc.setFatcaDetail(fatca_detail));

    KYCDetail.create({
      name: req.body.kyc_identity_detail.name,
      pan_number: req.body.kyc_identity_detail.pan_number,
      country_of_citizenship_ansi_code: "IN",
      date_of_birth: req.body.kyc_identity_detail.date_of_birth,
      gender: req.body.kyc_identity_detail.gender,
      marital_status: req.body.kyc_identity_detail.marital_status,
      residential_status: req.body.kyc_identity_detail.residential_status,
      occupation: req.body.kyc_identity_detail.occupation,
      pep_exposed: req.body.kyc_identity_detail.pep_exposed,
      pep_related: req.body.kyc_identity_detail.pep_related,
    }).then((kyc_detail) => userDoc.setKYCDetail(kyc_detail));

    const nomination = req.body.nomination.map((nominee) => {
      Nominee.create({
        name: nominee.name,
        date_of_birth: nominee.date_of_birth,
        relationship: nominee.relationship,
        allocation_percentage: nominee.allocation_percentage,
      }).then((nominee) => userDoc.setNominees(nominee));
    });

    res.json({ message: "investor created successfully" });
  });
};

exports.UpdateAddress = (req, res, next) => {
  Auth.findOne({ where: { id: req.userId }, include: Address })
    .then((doc) => {
      return doc.Address.update(req.body);
    })
    .then((add) => {
      res.json({ message: "Address is updated" });
    });
};

exports.UpdateBank = (req, res, next) => {
  Auth.findOne({ where: { id: req.userId }, include: Bank })
    .then((doc) => {
      console.log(doc);
      return doc.Banks[0].update(req.body.bank_detail, {
        where: { id: req.body.bank_id },
      });
    })
    .then((add) => {
      res.json({ message: "Bank is updated" });
    });
};

exports.UpdateFatcaDetail = (req, res, next) => {
  Auth.findOne({ where: { id: req.userId }, include: FatcaDetail })
    .then((doc) => {
      return doc.FatcaDetail.update(req.body);
    })
    .then((add) => {
      res.json({ message: "FatcaDetail is FatcaDetail" });
    });
};

exports.UpdateKYCDetail = (req, res, next) => {
  Auth.findOne({ where: { id: req.userId }, include: KYCDetail })
    .then((doc) => {
      return doc.KYCDetail.update(req.body);
    })
    .then((add) => {
      res.json({ message: "KYCDetail is FatcaDetail" });
    });
};

exports.UpdateNominee = (req, res, next) => {
  Auth.findOne({ where: { id: req.userId }, include: Nominee })
    .then((doc) => {
      console.log(doc);
      return doc.Nominees[0].update(req.body.nominee_detail, {
        where: { id: req.body.nominee_id },
      });
    })
    .then((add) => {
      res.json({ Nominee: "nominee is updated" });
    });
};
