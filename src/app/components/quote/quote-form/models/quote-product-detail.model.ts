import { RegisteredProduct } from 'src/app/components/product/models/registered-product.model';
import { NewQuoteRequestDetail } from '../../models/new-quote-request.model';

export interface QuoteProductDetail{
    registeredProduct?:RegisteredProduct;
    finalPrice: number;
    quantity: number;
    margin: number;
    subTotal:number;
}