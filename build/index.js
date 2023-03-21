"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
(0, database_1.createPurchase)(database_1.users[1].id, database_1.products[1].name, 1, database_1.products[0].price * 1);
console.table((0, database_1.getAllPurchasesFromUserId)("arthur"));
//# sourceMappingURL=index.js.map