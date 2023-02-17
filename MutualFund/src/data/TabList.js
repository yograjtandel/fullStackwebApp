export const CreateClientTabList = [
  { id: 1, Title: "Personal Details" },
  { id: 2, Title: "Address" },
  { id: 3, Title: "Dmat A/c Information" },
  { id: 4, Title: "Bank Information" },
  { id: 5, Title: "Nomination" },
  { id: 6, Title: "Guardian Details" },
];

export const CreateDistributorList = [
  { id: 1, Title: "Advisior Details" },
  { id: 2, Title: "Address" },
  { id: 3, Title: "Bank Information" },
];

export const CreateEmployeeList = [
  { id: 1, Title: "Personal Details" },
  { id: 2, Title: "Bank Information" },
  // { id: 3, Title: "Login Details"},
  { id: 3, Title: "Reporting" },
];

export const CreateReferalList = [
  { id: 1, Title: "Personal Details" },
  { id: 2, Title: "Bank Information" },
  { id: 3, Title: "Login Details " },
  { id: 4, Title: "E-mail  Confirgration" },
];

export const CreateSuperDistributorList = [
  { id: 1, Title: "Personal Details" },
  { id: 2, Title: "Bank Information" },
  { id: 3, Title: "Login Details" },
  { id: 4, Title: "E-mail Confirgration" },
];

export const MutualFundList = [
  {
    id: "equity",
    Title: "Equity",
    SubCategory: [
      { id: "equity_any" , Title: "any" },
      { id: "Flexi_Cap" , Title: "Flexi Cap" },
      { id: "Large_Cap" , Title: "Large Cap" },
      { id: "Mid_Cap" , Title: "Mid Cap" },
      { id: "ELSS" , Title: "ELSS" },
      { id: "Focused" , Title: "Focused" },
      { id: "Value" , Title: "Value" },
      { id: "Large_Mid Cap" , Title: "Large & Mid Cap" },
      { id: "Small_Cap" , Title: "Small Cap" },
      { id:  "Multi_Cap" ,  Title: "Multi Cap" },
      { id:  "Sectoral_Thematic" ,  Title: "Sectoral / Thematic" },
      { id:  "Contra" ,  Title: "Contra" },
      { id:  "Dividend_Yield" ,  Title: "Dividend Yield" },
      { id:  "Others" ,  Title: "Others" },
    ],
  },
  {
    id: "debt",
    Title: "Debt",
    SubCategory: [
      { id: "Any" , Title: "Any" },
      { id: "Liquid" , Title: "Liquid" },
      { id: "Overnight" , Title: "Overnight" },
      { id: "Corporate_Bond" , Title: "Corporate Bond" },
      { id: "Low_Duration" , Title: "Low Duration" },
      { id: "Mony_Market" , Title: "Mony Market" },
      { id: "Floater" , Title: "Floater" },
      { id: "Banking_PSU" , Title: "Banking & PSU" },
      { id: "Short_Duration" , Title: "Short Duration" },
      { id:  "Ultra_Short_Duration" ,  Title: "Ultra Short Duration" },
      { id:  "Medium_Duration" ,  Title: "Medium Duration" },
      { id:  "Credit_Risk" ,  Title: "Credit Risk" },
      { id:  "Dynamic_Bond" ,  Title: "Dynamic Bond" },
      { id:  "Gilt" ,  Title: "Gilt" },
      { id:  "Medium_to_Long_Duration" ,  Title: "Medium to Long Duration" },
      { id:  "Long_Duration" ,  Title: "Long Duration" },
      { id:  "Gilt_Medium_Long_Term" ,  Title: "Gilt Medium & Long Term" },
      { id:  "Gilt_with_10_year_Constant_Duration" ,  Title: "Gilt with 10 year Constant Duration" },
    ],
  },
  {
    id: "hybrid",
    Title: "Hybrid",
    SubCategory: [
      { id: "any" , Title: "any" },
      { id: "Aggressive" , Title: "Aggressive" },
      { id: "Dynamic_Asset_Allocation" , Title: "Dynamic Asset Allocation" },
      { id: "Balanced_Advantage" , Title: "Balanced Advantage" },
      { id: "Arbitrage" , Title: "Arbitrage" },
      { id: "Multi_Asset_Allocation" , Title: "Multi Asset Allocation" },
      { id: "Conservative" , Title: "Conservative" },
      { id: "Equity_Savings" , Title: "Equity Savings" },
    ],
  },
  { id: "fund_of_fund", Title: "Fund Of Fund", SubCategory: [] },
  { id: "index_funds", Title: "Index Funds", SubCategory: [] },
  { id: "solution_oriented", Title: "Solution Oriented", SubCategory: [] },
];
