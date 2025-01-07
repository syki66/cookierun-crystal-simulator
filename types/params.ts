import { inventoryProps } from './inventory';

export type initDataParams = {
  timestamp: number;
  currentCrystals: number;
  crystalsPerDay: number;
  crystals?: number[];
  inventory: inventoryProps[];
  defaultCrystal: number;
  skip: number;
  speed: number;
  threshold: number;
};
