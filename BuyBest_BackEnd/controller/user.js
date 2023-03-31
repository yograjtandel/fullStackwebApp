const Auth = require("../models/auth");
const User = require("../models/user");
const Address = require("../models/address");
const Bank = require("../models/bank");
const FatcaDetail = require("../models/fatca_detail");
const KYCDetail = require("../models/kyc_detail");
const Nominee = require("../models/nominee");

exports.getUseList = (req, res) => {
  const curt_page = +req.query.page || 1;
  const range = req.query.range ? req.query.range.split(",") : false;
  const ITEMS_PER_PAGE = req.query.limit ? +req.query.limit : 2;
  const offset = range ? +range[0] - 1 : (curt_page - 1) * ITEMS_PER_PAGE;
  Auth.findAndCountAll({
    attributes: ["id", "email", "mobile"],
    include: [User, Address, Bank, FatcaDetail, KYCDetail, Nominee],
    offset: offset,
    limit: ITEMS_PER_PAGE,
  })
    .then((data) => {
      if (!data) {
        const error = new Error("No user Found");
        error.statusCode = 404;
        throw error;
      }
      const count = data.count;
      const total_pages = Math.ceil(count / ITEMS_PER_PAGE);
      res.json({
        users: data.rows,
        count: count,
        next:
          !range && curt_page < total_pages
            ? curt_page + 1
            : +range[0] < +data.count && +range[1] < +data.count
            ? curt_page + 1
            : false,
        previous: curt_page > 1 ? curt_page - 1 : false,
        page_size: ITEMS_PER_PAGE,
      });
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
    })
      .then((address) => userDoc.setAddress(address))
      .catch((err) => {
        res.json({ err: err });
      });

    req.body.bank_accounts.map((bank_account) => {
      return Bank.create({
        number: bank_account.number,
        primary_account: bank_account.primary_account,
        type: bank_account.type,
        ifsc_code: bank_account.ifsc_code,
      })
        .then((bank) => userDoc.setBanks(bank))
        .catch((err) => {
          res.json({ err: err });
        });
    });

    FatcaDetail.create({
      country_of_birth_ansi_code: "IN",
      no_other_tax_residences: true,
      source_of_wealth: req.body.fatca_detail.source_of_wealth,
      gross_annual_income: req.body.fatca_detail.gross_annual_income,
    })
      .then((fatca_detail) => userDoc.setFatcaDetail(fatca_detail))
      .catch((err) => {
        res.json({ err: err });
      });

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
    })
      .then((kyc_detail) => userDoc.setKYCDetail(kyc_detail))
      .catch((err) => {
        res.json({ err: err });
      });

    req.body.nomination.map((nominee) => {
      Nominee.create({
        name: nominee.name,
        date_of_birth: nominee.date_of_birth,
        relationship: nominee.relationship,
        allocation_percentage: nominee.allocation_percentage,
      })
        .then((nominee) => userDoc.setNominees(nominee))
        .catch((err) => {
          res.json({ err: err });
        });
    });

    // https://fintechprimitives.com/docs/api/#create-an-investor
    // commented out because demo Auth token provided by api provider is expierd

    // fetch("https://s.finprim.com/api/onb/investors", {
    //   method: "post",
    //   body: JSON.stringify(req.body),
    //   headers: {
    //     "Content-Type": "Application/Json",
    //     Authorization: config.jwtConfig.AUTHORIZATION,
    //     "x-tenant-id": config.jwtConfig.XTENANTID,
    //   },
    // }).then(investor => {
    //     investor.json().then(data => {
    //         res.json({data: data,  message: "investor created successfully" });
    //     })
    // });

    res.json({ message: "investor created successfully" });
  });
};

// method Method to update record
exports.UpdateInvestor = (req, res, next) => {
  User.update(
    {
      perm_addr_is_corres_addr: req.body.perm_addr_is_corres_addr,
      skip_nomination: req.body.skip_nomination,
    },
    {
      where: {
        authId: req.body.id,
      },
    }
  ).then((res) => console.log(res));

  Address.update(
    {
      line1: req.body.correspondence_address.line1,
      city: req.body.correspondence_address.city,
      state: req.body.correspondence_address.state,
      pincode: req.body.correspondence_address.pincode,
      country_ansi_code: "IN",
    },
    {
      where: {
        authId: req.body.id,
      },
    }
  )
    .then((res) => console.log(res))
    .catch((err) => {
      res.json({ err: err });
    });

  req.body.bank_accounts.map((bank_account) => {
    return Bank.update(
      {
        number: bank_account.number,
        primary_account: bank_account.primary_account,
        type: bank_account.type,
        ifsc_code: bank_account.ifsc_code,
      },
      {
        where: {
          id: bank_account.id,
          authId: req.body.id,
        },
      }
    )
      .then((res) => console.log(res))
      .catch((err) => {
        res.json({ err: err });
      });
  });

  FatcaDetail.update(
    {
      country_of_birth_ansi_code: "IN",
      no_other_tax_residences: true,
      source_of_wealth: req.body.fatca_detail.source_of_wealth,
      gross_annual_income: req.body.fatca_detail.gross_annual_income,
    },
    {
      where: {
        authId: req.body.id,
      },
    }
  )
    .then((res) => console.log(res))
    .catch((err) => {
      res.json({ err: err });
    });

  KYCDetail.update(
    {
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
    },
    {
      where: {
        authId: req.body.id,
      },
    }
  )
    .then((res) => console.log(res))
    .catch((err) => {
      res.json({ err: err });
    });

  req.body.nomination.map((nominee) => {
    Nominee.update(
      {
        name: nominee.name,
        date_of_birth: nominee.date_of_birth,
        relationship: nominee.relationship,
        allocation_percentage: nominee.allocation_percentage,
      },
      {
        where: {
          id: nominee.id,
          authId: req.body.id,
        },
      }
    )
      .then((res) => console.log(res))
      .catch((err) => {
        res.json({ err: err });
      });
  });
};

// second Method to update record
exports.UpdateInvestor_1 = (req, res, next) => {
  Auth.findOne({
    where: { id: req.userId },
    include: [KYCDetail, FatcaDetail, Address, Bank, Nominee],
  }).then((doc) => {
    doc.KYCDetail.update(req.body.kyc_identity_detail);
    doc.FatcaDetail.update(req.body.fatca_detail);
    doc.Address.update(req.body.correspondence_address);
    doc.Banks.forEach((bank) => {
      bank.update(req.body.bank_accounts);
    });
    doc.Nominees.forEach((nominee) => {
      nominee.update(req.body.nomination);
    });

    // https://fintechprimitives.com/docs/api/#update-an-investor
    // commented out because demo Auth token provided by api provider is expierd
    // fetch(`https://s.finprim.com/api/onb/investors:${req.userId}`, {
    //   method: "post",
    //   body: JSON.stringify(req.body),
    //   headers: {
    //     "Content-Type": "Application/Json",
    //     Authorization: config.jwtConfig.AUTHORIZATION,
    //     "x-tenant-id": config.jwtConfig.XTENANTID,
    //   },
    // }).then((investor) => {
    //   investor.json().then((data) => {
    //     res.json({ data: data, message: "Investor is updated successfully" });
    //   });
    // });
    res.json({ message: "Investor is updated successfully", data: doc });
  });
};
