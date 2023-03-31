import taxesImg from "../assets/images/taxes.png";
import equitydebt from "../assets/images/equitydebt.png";
import fd from "../assets/images/fd.png";
import international from "../assets/images/international.png";
import lowcost from "../assets/images/lowcost.png";
import smart from "../assets/images/smart.png";

export const Fundcategories = {
  equity: "Equity",
  debt: "Debt",
  hybrid: "Hybrid",
  fund_of_fund: "Fund Of Fund",
  index_funds: "Index Funds",
  solution_oriented: "Solution Oriented",
};
export const FundSubcategories = [
  {
    id: "equity",
    Title: Fundcategories.equity,
    SubCategory: [
      { id: "equity_any", Title: "any" },
      { id: "Flexi_Cap", Title: "Flexi Cap" },
      { id: "Large_Cap", Title: "Large Cap" },
      { id: "Mid_Cap", Title: "Mid Cap" },
      { id: "ELSS", Title: "ELSS" },
      { id: "Focused", Title: "Focused" },
      { id: "Value", Title: "Value" },
      { id: "Large_Mid Cap", Title: "Large & Mid Cap" },
      { id: "Small_Cap", Title: "Small Cap" },
      { id: "Multi_Cap", Title: "Multi Cap" },
      { id: "Sectoral_Thematic", Title: "Sectoral / Thematic" },
      { id: "Contra", Title: "Contra" },
      { id: "Dividend_Yield", Title: "Dividend Yield" },
      { id: "Others", Title: "Others" },
    ],
  },
  {
    id: "debt",
    Title: Fundcategories.debt,
    SubCategory: [
      { id: "Any", Title: "Any" },
      { id: "Liquid", Title: "Liquid" },
      { id: "Overnight", Title: "Overnight" },
      { id: "Corporate_Bond", Title: "Corporate Bond" },
      { id: "Low_Duration", Title: "Low Duration" },
      { id: "Mony_Market", Title: "Mony Market" },
      { id: "Floater", Title: "Floater" },
      { id: "Banking_PSU", Title: "Banking & PSU" },
      { id: "Short_Duration", Title: "Short Duration" },
      { id: "Ultra_Short_Duration", Title: "Ultra Short Duration" },
      { id: "Medium_Duration", Title: "Medium Duration" },
      { id: "Credit_Risk", Title: "Credit Risk" },
      { id: "Dynamic_Bond", Title: "Dynamic Bond" },
      { id: "Gilt", Title: "Gilt" },
      { id: "Medium_to_Long_Duration", Title: "Medium to Long Duration" },
      { id: "Long_Duration", Title: "Long Duration" },
      { id: "Gilt_Medium_Long_Term", Title: "Gilt Medium & Long Term" },
      {
        id: "Gilt_with_10_year_Constant_Duration",
        Title: "Gilt with 10 year Constant Duration",
      },
    ],
  },
  {
    id: "hybrid",
    Title: Fundcategories.hybrid,
    SubCategory: [
      { id: "any", Title: "any" },
      { id: "Aggressive", Title: "Aggressive" },
      { id: "Dynamic_Asset_Allocation", Title: "Dynamic Asset Allocation" },
      { id: "Balanced_Advantage", Title: "Balanced Advantage" },
      { id: "Arbitrage", Title: "Arbitrage" },
      { id: "Multi_Asset_Allocation", Title: "Multi Asset Allocation" },
      { id: "Conservative", Title: "Conservative" },
      { id: "Equity_Savings", Title: "Equity Savings" },
    ],
  },
  { id: "fund_of_fund", Title: Fundcategories.fund_of_fund, SubCategory: [] },
  { id: "index_funds", Title: Fundcategories.index_funds, SubCategory: [] },
  {
    id: "solution_oriented",
    Title: Fundcategories.solution_oriented,
    SubCategory: [],
  },
];

export const GettingStarted = [
  {
    Title: "Save Texes",
    subTitle: "Build wealth and save taxes",
    icon: taxesImg,
  },
  {
    Title: "Low-cost index funds",
    subTitle: "Long term wealth creation at low cost",
    icon: lowcost,
  },
  {
    Title: "Smart beta",
    subTitle: "Hybrid of active and passive",
    icon: smart,
  },
  {
    Title: "International funds",
    subTitle: "Diversify your portfolio globally",
    icon: international,
  },
  {
    Title: "Equity + Debt",
    subTitle: "Stable income and growth",
    icon: equitydebt,
  },
  {
    Title: "Alternatives to bank FDs",
    subTitle: "Tax efficient; better returns than FDs",
    icon: fd,
  },
];
