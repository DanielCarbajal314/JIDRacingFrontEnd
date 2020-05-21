export interface RegisteredQuoteDetail {
    quantity: number;
    productName: string;
    finalPrice: number;
    subTotal: number;
}

export interface RegisteredQuoteWithDetails {
    id: number;
    clientName: string;
    date: Date;
    total: number;
    description: string;
    details: RegisteredQuoteDetail[];
}