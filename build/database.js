"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
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
exports.products = [
    {
        ide: "01",
        name: "Bola",
        price: 150,
        category: "Esporte"
    },
    {
        ide: "02",
        name: "Luva",
        price: 90,
        category: "Esporte"
    },
    {
        ide: "03",
        name: "Chuteira",
        price: 450,
        category: "Esporte"
    }
];
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
        totalPrice: exports.products[0].price * 2
    }
];
//# sourceMappingURL=database.js.map