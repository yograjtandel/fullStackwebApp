const axios = require("axios");

const FundModel = require("../models/funds");
const AMC = require("../models/AMC");

exports.getAMCList = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://latest-mutual-fund-nav.p.rapidapi.com/fetchAllMutualFundFamilies",
    headers: {
      "X-RapidAPI-Key": "934081904emsh762d831c31a8e2fp1f60c2jsnc70a62bcd597",
      "X-RapidAPI-Host": "latest-mutual-fund-nav.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(async (response) => {
      const AMCs = await AMC.findAll({ attributes: ["name", "id"] });
      if (AMCs.length === 0) {
        const amcList = response.data.map((amc) => {
          AMC.create({
            name: amc.toLowerCase().replace("mutual fund", "").trim(),
          });
        });
        res.json(amcList);
      }
      res.json(AMCs);
    })
    .catch(function (error) {
      console.error(error);
    });
};

exports.CreateFunds = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://latest-mutual-fund-nav.p.rapidapi.com/fetchAllSchemeNames",
    headers: {
      "X-RapidAPI-Key": "934081904emsh762d831c31a8e2fp1f60c2jsnc70a62bcd597",
      "X-RapidAPI-Host": "latest-mutual-fund-nav.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(async (response) => {
      const AMCs = await AMC.findAll({
        attributes: ["id", "name"],
      });
      console.log("amcID");
      const temp = JSON.stringify(AMCs, null, 2);
      //   console.log(temp);

      response.data.forEach(async (fund) => {
        if (
          fund.toLowerCase().includes("equity") &&
          !fund.toLowerCase().includes("equity savings") &&
          !fund.toLowerCase().includes("Equity hybrid")
        ) {
          const subCategoryList = [
            "flexi cap",
            ["large cap", "Largecap"],
            ["large & mid cap", "large and mid cap"],
            ["mid cap", "midcap"],
            "elss",
            "focused",
            "value",
            "small cap",
            "multi cap",
            "contra",
            "dividend",
            "sector",
          ];

          const index = subCategoryList.findIndex((item) => {
            const substr =
              item.length !== 2
                ? item.toLocaleLowerCase()
                : item[0].toLocaleLowerCase();
            const substr2 =
              item.length === 2 ? item[1].toLocaleLowerCase() : false;
            const temp = fund.toLowerCase().includes(substr);
            const temp2 = substr2
              ? fund.toLowerCase().includes(substr2)
              : false;
            // if (item.length === 2) {
            //   console.log("====");
            //   console.log(fund);
            //   console.log(fund.toLowerCase().includes(substr) + "----" + fund.toLowerCase().includes(substr2));
            // }
            return temp || temp2;
          });

          //           console.log("====");
          // console.log(item);
          //   if (index === -1) {
          //       console.log("----");
          //       console.log(fund);
          //   }

          let amcID = false;
          [...AMCs].forEach((amc) => {
            if (fund.toLowerCase().includes(amc.name)) {
              amcID = amc.id;
            }
          });

          //   if (!amcID) {
          //     console.log("equity======");
          //     console.log(fund);
          //   }
          FundModel.create({
            name: fund,
            type: "equity",
            subtype:
              index != -1
                ? index === 1 || index === 2 || index === 3
                  ? subCategoryList[index][0]
                  : subCategoryList[index]
                : "any",
            dividend: fund.toLowerCase().includes("growth") ? "growth" : "IDCW",
            AMCId: amcID,
          });
        } else if (fund.toLowerCase().includes("debt")) {
          const subCategoryList = [
            "liquid",
            "overnight",
            "corporate bond",
            "Low Duration",
            "Floater",
            "Banking & PSU",
            "Short Duration",
            "Ultra Short Duration",
            "Medium Duration",
            "Credit Risk",
            "Dynamic Bond",
            "Gilt",
            "Medium to Long Duration",
            "Long Duration",
          ];

          const index = subCategoryList.findIndex((item) =>
            fund
              .toLowerCase()
              .includes(
                item.length === 1
                  ? item.toLocaleLowerCase()
                  : item[0].toLocaleLowerCase() || item[1].toLocaleLowerCase()
              )
          );

          let amcID = false;
          [...AMCs].forEach((amc) => {
            if (fund.toLowerCase().includes(amc.name)) {
              amcID = amc.id;
            }
          });
          if (!amcID) {
            console.log("debt======");
            console.log(fund);
          }
          // FundModel.create({
          //   name: fund,
          //   type: "debt",
          //   subtype: index != -1 ? subCategoryList[index] : "any",
          //   dividend: fund.toLowerCase().includes("growth") ? "growth" : "IDCW",
          //   AMCId: amcID,
          // });
        } else if (fund.toLowerCase().includes("hybrid")) {
          const subCategoryList = [
            "Aggressive",
            "Dynamic Asset Allocation",
            "Balanced Advantage",
            "Arbitrage",
            "Multi Asset Allocation",
            "Conservative",
            "Equity Savings",
          ];

          const index = subCategoryList.findIndex((item) =>
            fund
              .toLowerCase()
              .includes(
                item.length === 1
                  ? item.toLocaleLowerCase()
                  : item[0].toLocaleLowerCase() || item[1].toLocaleLowerCase()
              )
          );

          let amcID = false;
          [...AMCs].forEach((amc) => {
            if (fund.toLowerCase().includes(amc.name)) {
              amcID = amc.id;
            }
          });
          if (!amcID) {
            console.log("hybrid======");
            console.log(fund);
          }

          //   FundModel.create({
          //     name: fund,
          //     type: "hybrid",
          //     subtype: index != -1 ? subCategoryList[index] : "any",
          //     dividend: fund.toLowerCase().includes("growth") ? "growth" : "IDCW",
          //     AMCId: amcID,
          //   });
        } else if (fund.toLowerCase().includes("fund of funds")) {
          let amcID = false;
          [...AMCs].forEach((amc) => {
            if (fund.toLowerCase().includes(amc.name)) {
              amcID = amc.id;
            }
          });
          if (!amcID) {
            console.log("fund of funds======");
            console.log(fund);
          }
          //   FundModel.create({
          //     name: fund,
          //     type: "fund_of_fund",
          //     subtype: "fund_of_fund",
          //     dividend: fund.toLowerCase().includes("growth") ? "growth" : "IDCW",
          //     AMCId: amcID,
          //   });
        } else if (fund.toLowerCase().includes("index funds")) {
          let amcID = false;
          [...AMCs].forEach((amc) => {
            if (fund.toLowerCase().includes(amc.name)) {
              amcID = amc.id;
            }
          });

          if (!amcID) {
            console.log("equity======");
            console.log(fund);
          }
          //   FundModel.create({
          //     name: fund,
          //     type: "index_funds",
          //     subtype: "index_funds",
          //     dividend: fund.toLowerCase().includes("growth") ? "growth" : "IDCW",
          //     AMCId: amcID,
          //   });
        } else if (fund.toLowerCase().includes("Solution")) {
          let amcID = false;
          [...AMCs].forEach((amc) => {
            if (fund.toLowerCase().includes(amc.name)) {
              amcID = amc.id;
            }
          });
          if (!amcID) {
            console.log("equity======");
            console.log(fund);
          }
          //   FundModel.create({
          //     name: fund,
          //     type: "solution_oriented",
          //     subtype: "solution_oriented",
          //     dividend: fund.toLowerCase().includes("growth") ? "growth" : "IDCW",
          //     AMCId: amcID,
          //   });
        }
      });
    })
    .catch(function (error) {
      console.error(error);
    });
};

exports.GetFunds = async (req, res) => {
  // const type = req.type | false;
  // const sub_type = req.sub_type | false;
  // const AMCId = req.amc | false;

  //   const where = {...req.where}
  console.log("req.where");
  console.log(+req.query.AMCId);
  const filter = {};
  if (req.query.AMCId) {
    filter["AMCId"] = +req.query.AMCId;
  }
  if (req.query.type) {
    filter["type"] = req.query.type;
  }
  if (req.query.subtype) {
    filter["subtype"] = req.query.subtype;
  }

  console.log(filter);
  //   const Funds = await FundModel.findAll({ where: { AMCId : +req.query.AMCId } });
  const Funds = await FundModel.findAll({
    attributes: ["name", "type", "subtype", "dividend"],
    where: filter,
  });
  // console.log(JSON.stringify(Funds, null, 2))
  res.json(Funds);
};
