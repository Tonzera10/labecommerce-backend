import { table } from "console";
import { TUser, TProduct, TPurchase } from "./types";

export enum CATEGORIA {
    ACESSORIOS = "Acessórios",
    ROUPAS = "Roupas",
    CALCADOS = "Calçados",
}

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

export function createUser(id: string, email: string, password: string): void {
    const newUser: TUser = {
        id,
        email,
        password
        }
    ;
    users.push(newUser)
    console.log("Usuário cadastrado com sucesso!")
}

export function getAllUsers(): void {
    console.table(users)
}

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

export function createProduct(id: string, name: string, price: number, category: CATEGORIA): void {
    const newProduct: TProduct = {
        id,
        name,
        price,
        category
        }
    ;
    products.push(newProduct)
    console.log("Produto cadastrado com sucesso!")
}

export function getAllProducts(): void {
    console.table(products)
}

export function getProductsById(idToSearch: string): TProduct[] {
    return products.filter((item) => item.id === idToSearch);
    
}
export function queryProductsByName(nameToSearch: string): TProduct[] {
    return products.filter((item) => item.name.toLowerCase() === nameToSearch);
    
}

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

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): void {
    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchase.push(newPurchase)
    console.log("Compra efetuada com sucesso!")
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] {
    return purchase.filter((item) => item.userId.toLowerCase() === userIdToSearch.toLowerCase());
}