import express, { Request, Response } from "express";
import cors from "cors";
import { products, purchase, users } from "./database";
import { CATEGORIA, TProduct, TPurchase, TUser } from "./types";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users")

    if(result.length < 1){
      res.status(400)
      throw new Error('Não existem usuários cadastrados');
    };
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products")

    if(result.length < 1){
      res.status(400)
      throw new Error('Não existem produtos cadastrados');
    };
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.get("/products/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.q as string;

    if (!name) {
      throw new Error("Nome não existe");
    }
    if (name.length < 1) {
      res.status(400);
      throw new Error("Nome Precisa de pelo menos 1 caractere");
    }

    const result = await db.select("*").from("products").where("name", "LIKE", `%${name}%`)

    if(result.length < 1){
      res.status(400)
      throw new Error('Nenhum produto encontrado');
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;
    

    if (!id || !name || !email || !password) {
      res.status(400)
      throw new Error("Dados inválidos")
    }
    const emailExist = await db.select("*").from("users").where({email: email})

    if(emailExist.length < 1){
      res.status(400)
      throw new Error('Email ja existe');
    }

    const newUser = {
      id: id,
      name: name,
      email: email,
      password: password
    }

    await db.insert(newUser).into("users")

    res.status(201).send("Usuário criado com sucesso!");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, description, imageUrl } = req.body;
    

    if (!id) {
      throw new Error("Nome não existe");
    }
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'Id' deve ser uma string");
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

    if (!description) {
      throw new Error("Descrição não existe");
    }
    if (typeof description !== "string") {
      res.status(400);
      throw new Error("Descrição deve ser uma string");
    }

    if (!imageUrl) {
      throw new Error("Descrição não existe");
    }
    if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("imagem deve ser uma string");
    }

    const newProduct = {
      id,
      name,
      price,
      description,
      imageUrl
    };

    await db.insert(newProduct).into("products")

    res.status(201).send("Produto criado com sucesso!");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.post("/purchases",  async (req: Request, res: Response) => { 
  try {
    const { id, buyer_id, total_price } = req.body;

    if (!id) {
      throw new Error("Id não existe");
    }
    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'Id' deve ser uma string");
    }

    if (!buyer_id) {
      throw new Error("Id de usuário não existe");
    }
    if (typeof buyer_id !== "string") {
      res.status(400);
      throw new Error("Id de usuário deve ser uma string");
    }

    if (!total_price) {
      throw new Error("Preço total não existe");
    }
    if (typeof total_price !== "number") {
      res.status(400);
      throw new Error("Preço total deve ser um número");
    }

    const newPurchase = {
      id,
      buyer_id,
      total_price
    };

    await db.insert(newPurchase).into("purchases")

    res.status(201).send("Compra efetuada com sucesso!");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.post("/purchases_products", async (req: Request, res: Response) => {
  try {
    const { purchases_id, products_id, quantity } = req.body

    if (!purchases_id) {
      throw new Error("Id de compra não existe");
    }
    if (typeof purchases_id !== "string") {
      res.status(400);
      throw new Error("Id de compra deve ser uma string");
    }

    if (!products_id) {
      throw new Error("Id do produto não existe");
    }
    if (typeof products_id !== "string") {
      res.status(400);
      throw new Error("Id do produto deve ser uma string");
    }

    if (!quantity) {
      throw new Error("Quantidade não existe");
    }
    if (typeof quantity !== "number") {
      res.status(400);
      throw new Error("Quantidade deve ser um número");
    }
    if(quantity < 1){
      res.status(400);
      throw new Error("Quantidade nãopode ser 0 ou negativa!");
    }

    const newPurchase = {
      purchases_id,
      products_id,
      quantity
    }

    await db.insert(newPurchase).into("purchases_products")

    res.status(201).send("Compra efetuada com sucesso!");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
})

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db.select("*").from("products").where({id:id})

    if (result.length < 1) {
      throw new Error("Produto não encontrado!");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await db.select("*").from("purchases").where({id:id})

    if (result.length < 1) {
      throw new Error("Pedido não encontrado!");
    }

    const resultFinal = await db("purchases")
    .select(
      "purchases.id AS purchaseId",
      "buyer_id AS buyerId",
      "users.name AS buyerName",
      "users.email AS buyerEmail",
      "total_price AS totalPrice",
      "created_at AS createdAt",
      "paid",
      "products.id",
      "products.name",
      "price",
      "description",
      "imageUrl",
      "quantity"
    )
    .innerJoin(
      "users",
      "purchases.buyer_id",
      "=",
      "users.id"
    )
    .innerJoin(
      "purchases_products",
      "purchases.id",
      "=",
      "purchases_products.purchases_id"
    )
    .innerJoin(
      "products",
      "products.id",
      "=",
      "purchases_products.products_id"
    )
    .where("purchases.id", "=", `${id}`)

    
    const product = resultFinal.map((prod)=>{
        return {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          description: prod.description,
          imageUrl: prod.imageUrl,
          quantity: prod.quantity
        }
      })

    const total = resultFinal.reduce(function(total, price){
      return total + price.price
    }, 0)

      const finalResult = {
        purchaseId: resultFinal[0].purchaseId,
        buyerId: resultFinal[0].buyerId,
        buyerName: resultFinal[0].buyerName,
        buyerEmail: resultFinal[0].buyerEmail,
        totalPrice: total,
        createdAt: resultFinal[0].createdAt,
        paid: resultFinal[0].paid,
        product
      }
    
    res.status(200).send(finalResult);
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [user] = await db.select("*").from("users").where({id:id})

    if(user.length < 1){
      res.status(400)
      throw new Error("Usuário não existe");
    }

    await db.delete().from("users").where({id:id})
    
    res.status(200).send("Usuário apagado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [product] = await db.select("*").from("products").where({id:id});

    if(product.length < 1){
      res.status(404)
      throw new Error("Produto não encontrado!");
    };

    await db.delete().from("products").where({id:id})

    res.status(200).send("Produto apagado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [purchase] = await db.select("*").from("purchases").where({id:id});

    if(purchase.length < 1){
      res.status(404)
      throw new Error("Produto não encontrado!");
    };

    await db.delete().from("purchases").where({id:id});
    await db.delete().from("purchases_products").where({id:id});


    res.status(200).send("Pedido apagado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const newId = req.body.id
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;

    const [user] = await db.select("*").from("users").where({id:id})

    if(user){
      await db.update({
        id: newId || user.id,
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password
      }).from("users").where({id:id})
    }
    
    res.status(200).send("Usuário atualizado com sucesso")

  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImg = req.body.imageUrl

    const [product] = await db.select("*").from("products").where({id:id});

    if (product) {
      await db.update({
        name: newName || product.name,
        price: newPrice || product.price,
        description: newDescription || product.description,
        imageUrl: newImg || product.imageUrl
      }).from("products").where({id:id});
    }
    res.status(200).send("Produto atualizado com sucesso");
  } catch (error: any) {
    console.log(error);

    if (req.statusCode === 200) {
        res.status(500)
    }

    if (error instanceof Error) {
        res.send(error.message)
    } else {
        res.send("Erro inesperado")
    }
  }
});
