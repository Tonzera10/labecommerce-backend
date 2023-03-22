import express, { Request, Response } from "express";
import cors from "cors";
import { products, purchase, users } from "./database";
import { CATEGORIA, TProduct, TPurchase, TUser } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500).send(error.message);
    }
  }
});

app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500).send(error.message);
    }
  }
});

app.get("/products/search", (req: Request, res: Response) => {
  try {
    const name = req.query.q as string;

    if (!name) {
      throw new Error("Nome não existe");
    }
    if (name.length < 1) {
      res.status(400);
      throw new Error("Nome Precisa de pelo menos 1 caractere");
    }

    const result = products.filter((product) => {
      return product.name.toLowerCase().includes(name.toLowerCase());
    });

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500).send(error.message);
    }
  }
});

app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body;

    if (!id) {
      throw new Error("Id não existe");
    }
    if (typeof id !== "string") {
      throw new Error("'Id' deve ser uma string");
    }

    const userExists = users.find((user) => user.id === id);
    if (userExists) {
      throw new Error("Id já criado");
    }

    if (!email) {
      throw new Error("Email não existe");
    }
    if (typeof email !== "string") {
      throw new Error("'Email' deve ser uma string");
    }

    const EmailExists = users.find((user) => user.email === email);
    if (EmailExists) {
      throw new Error("Email já criado");
    }

    if (!password) {
      throw new Error("");
    }
    if (typeof password !== "string") {
      throw new Error("'Password' deve ser uma string");
    }

    const newUser: TUser = {
      id,
      email,
      password,
    };

    users.push(newUser);

    res.status(201).send("Usuário criadocom sucesso!");
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, category } = req.body;

    if (!id) {
      throw new Error("Id não existe");
    }
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'Id' deve ser uma string");
    }

    const userExists = users.find((user) => user.id === id);
    if (userExists) {
      res.status(400);
      throw new Error("Id já criado");
    }

    if (!name) {
      throw new Error("Nome não existe");
    }
    if (typeof name !== "string") {
      res.status(400);
      throw new Error("'Name' deve ser uma string");
    }

    if (!price) {
      throw new Error("Preço não existe");
    }
    if (typeof price !== "number") {
      res.status(400);
      throw new Error("'Price' deve ser um número");
    }

    if (!category) {
      throw new Error("Categoria não existe");
    }
    if (
      category !== CATEGORIA.ACESSORIOS &&
      category !== CATEGORIA.CALCADOS &&
      category !== CATEGORIA.ROUPAS
    ) {
      res.status(400);
      throw new Error("'Category' deve ser uma das categorias do enum");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      category,
    };

    products.push(newProduct);

    res.status(201).send("Produto criado com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500).send(error.message);
    }
  }
});

app.post("/purchase", (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body;

    if (!userId) {
      throw new Error("Usuário não existe");
    }

    if (typeof userId !== "string") {
      throw new Error("'UserId' deve ser uma string");
    }

    const userExists = users.find((user) => user.id === userId);
    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    if (!productId) {
      throw new Error("Produto não existe");
    }
    if (typeof productId !== "string") {
      throw new Error("'UserId' deve ser uma string");
    }

    const productExists = products.find((product) => product.id === productId);
    if (!productExists) {
      throw new Error("Produto não encontrado");
    }

    if (!quantity) {
      throw new Error("Quantidade não existe");
    }
    if (typeof quantity !== "number") {
      throw new Error("Quantity deve ser um número");
    }

    if (!totalPrice) {
      throw new Error("Preço total não existe");
    }
    if (typeof totalPrice !== "number") {
      throw new Error("Preço total deve ser um número");
    }

    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice,
    };

    purchase.push(newPurchase);

    res.status(201).send("Compra efetuada com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500).send(error.message);
    }
  }
});

app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = products.find((product) => product.id === id);

    if (!result) {
      throw new Error("Produto não encontrado!");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500).send(error.message);
    }
  }
});

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = purchase.find((user) => user.userId.toLowerCase() === id);

    if (!result) {
      throw new Error("Usuário não encontrado!");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500).send(error.message);
    }
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userIndex = users.findIndex((user) => user.id.toLowerCase() === id);

    userIndex >= 0
      ? (users.splice(userIndex, 1),
        res.status(200).send("Usuário apagado com sucesso"))
      : res.status(404).send("Usuário não encontrado");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500).send(error.message);
    }
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex < 0) {
      throw new Error("Produto não encontrado");
    }
    products.splice(productIndex, 1);
    res.status(200).send("Produto apagado com sucesso");
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const newId = req.body.id;
    const newEmail = req.body.email;
    const newPassword = req.body.password;

    if (!newId) {
      throw new Error("Novo id não existe");
    }
    if (typeof newId !== "string") {
      throw new Error("Novo id deve ser uma string");
    }

    if (!newEmail) {
      throw new Error("Novo email não existe");
    }
    if (typeof newEmail !== "string") {
      throw new Error("Novo email deve ser uma string");
    }

    if (!newPassword) {
      throw new Error("Novo password não existe");
    }
    if (typeof newPassword !== "string") {
      throw new Error("Novo password deve ser uma string");
    }

    const findUser = users.find((user) => user.id.toLowerCase() === id);

    findUser
      ? ((findUser.id = newId || findUser.id),
        (findUser.email = newEmail || findUser.email),
        (findUser.password = newPassword || findUser.password),
        res.status(200).send("Usuário atualizado com sucesso"))
      : res.status(404).send("Usuário não encontrado");
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newCategory = req.body.category;

    if (!newId) {
      throw new Error("Novo id não existe");
    }

    if (typeof newId !== "string") {
      throw new Error("Novo id deve ser uma string");
    }

    if (!newName) {
      throw new Error("Novo nome não existe");
    }

    if (typeof newName !== "string") {
      throw new Error("Novo nome deve ser uma string");
    }

    if (!newPrice) {
      throw new Error("Novo preço não existe");
    }

    if (typeof newPrice !== "number") {
      throw new Error("Novo preço deve ser um número");
    }

    if (!newCategory) {
      throw new Error("Nova categoria não existe");
    }

    if (
      newCategory !== CATEGORIA.ACESSORIOS &&
      newCategory !== CATEGORIA.CALCADOS &&
      newCategory !== CATEGORIA.ROUPAS
    ) {
      throw new Error(
        "Nova categoria deve ser uma das categorias já determinadas no enum"
      );
    }

    const findProduct = products.find((product) => product.id === id);

    if (findProduct) {
      (findProduct.id = newId || findProduct.id),
        (findProduct.name = newName || findProduct.name),
        (findProduct.price = newPrice || findProduct.price),
        (findProduct.category = newCategory || findProduct.category);
    } else {
      throw new Error("Produto não encontrado");
    }
    res.status(200).send("Produto atualizado com sucesso");
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
