export const energyKeyLabels = {
  coal: "Coal [USD/tonne]",
  oil: "Oil [USD/barrel]"
} as LabelType
export const foodKeyLabels = {
  rice: "Rice [USD/tonne]",
  wheat: "Oil [USD/tonne]"
} as LabelType
export const metalKeyLabels = {
  gold: "Gold [USD/kg]",
  silver: "Silver [USD/kg]"
} as LabelType


export type LabelType = {
  [key: string]: string
}