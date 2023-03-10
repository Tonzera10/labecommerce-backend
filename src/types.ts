export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    ide: string,
    name: string,
    price: number,
    category: string
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}