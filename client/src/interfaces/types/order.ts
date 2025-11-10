export type TOrder = {
    id?: string;
    customer_id: string;
    payment_id?: string;
    code: string,
    address: string,
    order_status: string,
    created_at?: string;
    updated_at?: string;
    final_total: number;
    discount?: number;
    total: number;
    is_payment: boolean;
}

export type TOrderDetail = {
    id?: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
    created_at?: string;
    updated_at?: string;
}