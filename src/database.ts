import { TUser, TProduct, TPurchase, CATEGORIA } from "./types";

export const users: TUser[] =  [
    {
        id: "Ton",
        email: "tom@gmail.com",
        password: "gremio"
    },
    {
        id: "Arthur",
        email: "arthur@gmail.com",
        password: "12345"
    },
    {
        id: "Kieffer",
        email: "kieffer@gmail.com",
        password: "54321"
    }
]

export const products: TProduct[] = [
    {
        id: "01",
        name: "Bola",
        price: 150,
        category: CATEGORIA.ACESSORIOS
    },
    {
        id: "02",
        name: "Luva",
        price: 290,
        category: CATEGORIA.ACESSORIOS
    },
    {
        id: "03",
        name: "Chuteira",
        price: 450,
        category: CATEGORIA.CALCADOS
    }
]

export const purchase: TPurchase[] = [
    {
        userId: users[0].id,
        productId: products[2].name,
        quantity: 2,
        totalPrice: products[2].price * 2
    },
    {
        userId: users[1].id,
        productId: products[0].name,
        quantity: 1,
        totalPrice: products[0].price * 1
    },
    {
        userId: users[2].id,
        productId: products[1].name,
        quantity: 2,
        totalPrice: products[1].price * 2
    }
]
