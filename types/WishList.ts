import Product from "./Product";

export default interface WishList {
  id: string;
  created_at: string;
  product: Product;
  user: string;
}
