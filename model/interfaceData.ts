export interface Item {
  id: number;
  name: string;
  weight: number;
  value: number;
  quantity: number;
  active: boolean;
}

export interface ItemInput {
  name: string;
  weight: number;
  value: number;
  quantity: number;
  id?: number; // Optional
  active?: boolean; // Optional
}