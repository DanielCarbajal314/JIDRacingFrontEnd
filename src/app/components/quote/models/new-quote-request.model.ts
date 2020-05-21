export interface NewQuoteRequestDetail {
    cost: number;
    finalPrice: number;
    productId: number;
    quantity: number;
}

export interface NewQuoteRequest {
    clientId: number;
    description: string;
    details: NewQuoteRequestDetail[];
}