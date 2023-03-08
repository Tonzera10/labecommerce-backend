"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.purchase = exports.queryProductsByName = exports.getProductsById = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = exports.CATEGORIA = void 0;
var CATEGORIA;
(function (CATEGORIA) {
    CATEGORIA["ACESSORIOS"] = "Acess\u00F3rios";
    CATEGORIA["ROUPAS"] = "Roupas";
    CATEGORIA["CALCADOS"] = "Cal\u00E7ados";
})(CATEGORIA = exports.CATEGORIA || (exports.CATEGORIA = {}));
exports.users = [
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
];
function createUser(id, email, password) {
    const newUser = {
        id,
        email,
        password
    };
    exports.users.push(newUser);
    console.log("Usuário cadastrado com sucesso!");
}
exports.createUser = createUser;
function getAllUsers() {
    console.table(exports.users);
}
exports.getAllUsers = getAllUsers;
exports.products = [
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
];
function createProduct(id, name, price, category) {
    const newProduct = {
        id,
        name,
        price,
        category
    };
    exports.products.push(newProduct);
    console.log("Produto cadastrado com sucesso!");
}
exports.createProduct = createProduct;
function getAllProducts() {
    console.table(exports.products);
}
exports.getAllProducts = getAllProducts;
function getProductsById(idToSearch) {
    return exports.products.filter((item) => item.id === idToSearch);
}
exports.getProductsById = getProductsById;
function queryProductsByName(nameToSearch) {
    return exports.products.filter((item) => item.name.toLowerCase() === nameToSearch);
}
exports.queryProductsByName = queryProductsByName;
exports.purchase = [
    {
        userId: exports.users[0].id,
        productId: exports.products[2].name,
        quantity: 2,
        totalPrice: exports.products[2].price * 2
    },
    {
        userId: exports.users[1].id,
        productId: exports.products[0].name,
        quantity: 1,
        totalPrice: exports.products[0].price * 1
    },
    {
        userId: exports.users[2].id,
        productId: exports.products[1].name,
        quantity: 2,
        totalPrice: exports.products[1].price * 2
    }
];
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    exports.purchase.push(newPurchase);
    console.log("Compra efetuada com sucesso!");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    return exports.purchase.filter((item) => item.userId.toLowerCase() === userIdToSearch);
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map