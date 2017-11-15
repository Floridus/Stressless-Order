import { Product } from './product';

export class Order {
    id: number;
    product: Product;
    amount: number;
    is_ordered: boolean;
    is_canceled: boolean;
    is_ready: boolean;
}