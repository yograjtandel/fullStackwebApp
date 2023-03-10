const StateList = [
  { id: 38, name: "Other", code: "OH", country: 1 },
  { id: 37, name: "Lakshadweep", code: "LD", country: 1 },
  { id: 36, name: "Daman and Diu", code: "DD", country: 1 },
  { id: 35, name: "Dadra and Nagar Haveli", code: "DN", country: 1 },
  { id: 34, name: "West Bengal", code: "WB", country: 1 },
  { id: 33, name: "Uttaranchal", code: "UC", country: 1 },
  { id: 32, name: "Uttar Pradesh", code: "UP", country: 1 },
  { id: 31, name: "Tripura", code: "TR", country: 1 },
  { id: 30, name: "Tamil Nadu", code: "TN", country: 1 },
  { id: 29, name: "Telengana", code: "TG", country: 1 },
  { id: 28, name: "Sikkim", code: "SI", country: 1 },
  { id: 27, name: "Rajasthan", code: "RA", country: 1 },
  { id: 26, name: "Punjab", code: "PU", country: 1 },
  { id: 25, name: "Pondicherry", code: "PO", country: 1 },
  { id: 24, name: "Orissa", code: "OR", country: 1 },
  { id: 23, name: "New Delhi", code: "ND", country: 1 },
  { id: 22, name: "Nagaland", code: "NA", country: 1 },
  { id: 21, name: "Mizoram", code: "MI", country: 1 },
  { id: 20, name: "Meghalaya", code: "ME", country: 1 },
  { id: 19, name: "Manipur", code: "MN", country: 1 },
  { id: 18, name: "Maharashtra", code: "MA", country: 1 },
  { id: 17, name: "Madhya Pradesh", code: "MP", country: 1 },
  { id: 16, name: "Kerala", code: "KE", country: 1 },
  { id: 15, name: "Karnataka", code: "KA", country: 1 },
  { id: 14, name: "Jharkhand", code: "JK", country: 1 },
  { id: 13, name: "Jammu & Kashmir", code: "JM", country: 1 },
  { id: 12, name: "Himachal Pradesh", code: "HP", country: 1 },
  { id: 11, name: "Haryana", code: "HA", country: 1 },
  { id: 10, name: "Gujarat", code: "GU", country: 1 },
  { id: 9, name: "GOA", code: "GO", country: 1 },
  { id: 8, name: "Delhi", code: "DL", country: 1 },
  { id: 7, name: "Chhattisgarh", code: "CG", country: 1 },
  { id: 6, name: "Chandigarh", code: "CH", country: 1 },
  { id: 5, name: "Bihar", code: "BH", country: 1 },
  { id: 4, name: "Assam", code: "AS", country: 1 },
  { id: 3, name: "Andhra Pradesh", code: "AP", country: 1 },
  { id: 2, name: "Arunachal Pradesh", code: "AR", country: 1 },
  { id: 1, name: "Andaman & Nicobar", code: "AN", country: 1 },
];

export const stateList = StateList.map((item) => ({
  value: item.id,
  label: item.name,
}));
