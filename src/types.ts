

export enum CATEGORIA {
    ACESSORIOS = "Acessórios",
    ROUPAS = "Roupas",
    CALCADOS = "Calçados",
}

export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
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