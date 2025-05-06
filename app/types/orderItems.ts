import { Product } from "./product";

export type OrderItem = {
    id: number;
    quantity: number;
    order: number;
    product: Product
}