export const energyKeyLabels = [
  {key: "PNRG", label: "Energy Index", unit: "[2016=100]"},
  {key: "POILAPSP", label: "Crude Oil (Avg Spot)", unit: "[USD/barrel]"},
  {key: "POILAPSP.1", label: "Crude Oil (Avg Spot)", unit: "[USD/barrel]"},
  {key: "POILBRE", label: "Brent Oil", unit: "[USD/barrel]"},
  {key: "POILDUB", label: "Dubai Oil", unit: "[USD/barrel]"},
  {key: "POILWTI", label: "WTI Oil", unit: "[USD/barrel]"},
  {key: "PNGAS", label: "Natural Gas Index", unit: "[2016=100]"},
  {key: "PNGASEU", label: "Natural Gas (EU TTF)", unit: "[USD/MMBtu]"},
  {key: "PNGASJP", label: "Natural Gas (Japan LNG)", unit: "[USD/MMBtu]"},
  {key: "PNGASUS", label: "Natural Gas (US Henry Hub)", unit: "[USD/MMBtu]"},
  {key: "PPROPANE", label: "Propane", unit: "[USD/MMBtu]"},
  {key: "PCOAL", label: "Coal Index", unit: "[2016=100]"},
  {key: "PCOALAU", label: "Coal (Australia)", unit: "[USD/tonne]"},
  {key: "PCOALSA_USD", label: "Coal (South Africa)", unit: "[USD/tonne]"}
]

export const foodKeyLabels = [
  {key: "PRICENPQ", label: "Rice", unit: "[USD/tonne]"},
  {key: "PWHEAMT", label: "Wheat", unit: "[USD/tonne]"},
  {key: "PMAIZMT", label: "Maize (Corn)", unit: "[USD/tonne]"},
  {key: "PSOYB", label: "Soybeans", unit: "[USD/tonne]"},
  {key: "PSOIL", label: "Soybean Oil", unit: "[USD/tonne]"},
  {key: "PSMEA", label: "Soybean Meal", unit: "[USD/tonne]"},
  {key: "PSUGAISA", label: "Sugar (Intl)", unit: "[USD/lb]"},
  {key: "PSUGAUSA", label: "Sugar (US)", unit: "[USD/lb]"},
  {key: "PPOULT", label: "Poultry", unit: "[USD/lb]"},
  {key: "PBEEF", label: "Beef", unit: "[USD/lb]"},
  {key: "PPORK", label: "Pork", unit: "[USD/lb]"},
  {key: "PBANSOP", label: "Bananas", unit: "[USD/tonne]"},
  {key: "PFSHMEAL", label: "Fishmeal", unit: "[USD/tonne]"},
  {key: "PSALM", label: "Salmon", unit: "[USD/kg]"},
  {key: "PMILK", label: "Milk", unit: "[USD/cwt]"},
  {key: "PTOMATO", label: "Tomatoes", unit: "[EUR/kg]"},
  {key: "PAPPLE", label: "Apples", unit: "[EUR/kg]"},
  {key: "PCHANA", label: "Chana", unit: "[INR/100kg]"},
  {key: "PGNUTS", label: "Groundnuts", unit: "[USD/tonne]"}
]

export const metalKeyLabels = [
  {key: "PGOLD", label: "Gold", unit: "[USD/oz]"},
  {key: "PSILVER", label: "Silver", unit: "[USD/oz]"},
  {key: "PPLAT", label: "Platinum", unit: "[USD/oz]"},
  {key: "PPALLA", label: "Palladium", unit: "[USD/oz]"},
  {key: "PALUM", label: "Aluminum", unit: "[USD/tonne]"},
  {key: "PCOPP", label: "Copper", unit: "[USD/tonne]"},
  {key: "PLEAD", label: "Lead", unit: "[USD/tonne]"},
  {key: "PTIN", label: "Tin", unit: "[USD/tonne]"},
  {key: "PZINC", label: "Zinc", unit: "[USD/tonne]"},
  {key: "PNICK", label: "Nickel", unit: "[USD/tonne]"},
  {key: "PCOBA", label: "Cobalt", unit: "[USD/tonne]"},
  {key: "PURAN", label: "Uranium", unit: "[USD/lb]"},
  {key: "PLMMODY", label: "Molybdenum", unit: "[USD/tonne]"},
  {key: "PIORECR", label: "Iron Ore", unit: "[USD/tonne]"}
]

export type CommodityLabel = {
  key: string
  label: string
  unit: string
}
