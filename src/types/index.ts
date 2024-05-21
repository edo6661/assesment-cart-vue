import { products } from "@/constants/products";

export type IProduct = (typeof products)[0];
interface Cart extends IProduct {
  selected: boolean;
  amount: number;
}
export type ICart = Cart[];
