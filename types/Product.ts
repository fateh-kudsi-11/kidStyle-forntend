export type ColorType = {
  colorCode: string;
  color: string;
};
export type ProductImage = {
  image: string;
  color: string;
};

export type ProductImages = {
  [color: string]: ProductImage[];
};

export default interface Product {
  id: string;
  sizes: string[];
  colors: ColorType[];
  images: ProductImages;
  details: string[];
  brand: string;
  category: string;
  productType: string;
  productName: string;
  price: string;
  description: string;
  createAt: string;
  watchCount: number;
}
