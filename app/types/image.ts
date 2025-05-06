import { Product } from "./product";

export type ImageType = {
  id?: number;
  url: string;
  product?: Product;
};

export type ImageSource = ImageType | File;