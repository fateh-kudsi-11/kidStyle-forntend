import Product from "./Product";

export default interface OrderItem {
  id: string;
  created_at: string;
  product: string;
  user: string;
  qty: number;
  selected_color: string;
  selected_size: string;
  product_info: Product;
}

export interface CreateOrderReq {
  selected_color: string;
  selected_size: string;
  qty: number;
  product: string;
}
