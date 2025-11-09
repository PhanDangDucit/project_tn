export type TProduct = {
    id?:string;
    name?: string;
    created_at?: string;
    updated_at?: string;
    price?: number;
    price_sale?: number;
    description?: string;
    image?: string;
    category_id?: string;
    quantity?: number;
    count_sold?: number;
}