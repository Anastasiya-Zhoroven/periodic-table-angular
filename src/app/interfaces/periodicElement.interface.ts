export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export type PeriodicElementKey = keyof PeriodicElement;
export type PeriodicElementValue = string | number;
