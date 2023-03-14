import { users, products, purchase } from "./database";
import { CATEGORIA, TProduct, TPurchase, TUser } from "./types";

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

// console.log(users)
// console.log(products)
// console.log(purchase)

// createUser("Mel", "mel@email.com", "12345")
// getAllUsers()

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

// createProduct("04", "Camisa do Grêmio", 300, CATEGORIA.ROUPAS)
// getAllProducts()
// console.log(getProductsById("03"))
// console.log(queryProductsByName("chuteira"))

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

createPurchase(users[1].id, products[1].name, 1, products[0].price * 1)
console.table(getAllPurchasesFromUserId("arthur"))