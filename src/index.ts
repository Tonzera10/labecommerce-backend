import { users, products, purchase, createUser, getAllUsers, CATEGORIA, createProduct, getAllProducts, getProductsById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";


// console.log(users)
// console.log(products)
// console.log(purchase)

// createUser("Mel", "mel@email.com", "12345")
// getAllUsers()

// createProduct("04", "Camisa do Grêmio", 300, CATEGORIA.ROUPAS)
// getAllProducts()
// console.log(getProductsById("03"))
// console.log(queryProductsByName("chuteira"))

createPurchase(users[1].id, products[1].name, 1, products[0].price * 1)
console.table(getAllPurchasesFromUserId("arthur"))