import  express, { Request, Response} from 'express'
import cors from 'cors';
import { products, purchase, users } from './database';
import { CATEGORIA, TProduct, TPurchase, TUser } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/users', (req: Request, res: Response)=>{
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500).send(error.message)
        } 
    }
})

app.get('/products', (req: Request, res: Response)=>{
    try {
        res.status(200).send(products)
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500).send(error.message)
        } 
    }
})

app.get('/products/search', (req: Request, res: Response)=>{
    try {
        const name = req.query.q as string

        if(name !== undefined){
            if(name.length < 1){
                res.status(400)
                throw new Error("Nome Precisa de pelo menos 1 caractere");
            }
        }
    
        const result = products.filter((product)=> {
            return product.name.toLowerCase().includes(name.toLowerCase())
        })
    
        res.status(200).send(result)
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500).send(error.message)
        } 
    }
})

app.post('/users', (req: Request, res: Response)=>{
    try {
        const {id, email, password} = req.body
        
        if(id !== undefined){
            if(typeof id !== 'string'){
                res.status(400)
                throw new Error("'Id' deve ser uma string"); 
            }

            const userExists = users.find((user) => user.id === id)
            if(userExists){
                res.status(400)
                throw new Error("Id já criado");
            }
        }
        if(email !== undefined){
            if(typeof email !== 'string'){
                res.status(400)
                throw new Error("'Email' deve ser uma string"); 
            }

            const userExists = users.find((user) => user.email === email)
            if(userExists){
                res.status(400)
                throw new Error("Email já criado");
            }
        }

        if(password !== undefined){
            if(typeof password !== 'string'){
                res.status(400)
                throw new Error("'Password' deve ser uma string");
            }
        }

    
        const newUser: TUser = {
            id,
            email,
            password
        } 
    
        users.push(newUser)
    
        res.status(201).send("Usuário criadocom sucesso!")
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500).send(error.message)
        } 
    }
})

app.post('/products', (req: Request, res: Response)=>{
    try {
        const {id, name, price, category} = req.body

        if(id !== undefined){
            if(typeof id !== 'string'){
                res.status(400)
                throw new Error("'Id' deve ser uma string"); 
            }

            const userExists = users.find((user) => user.id === id)
            if(userExists){
                res.status(400)
                throw new Error("Id já criado");
            }
        }

        if(name !== undefined){
            if(typeof name !== 'string'){
                res.status(400)
                throw new Error("'Name' deve ser uma string"); 
            }
        }

        if(price !== undefined){
            if(typeof price !== 'number'){
                res.status(400)
                throw new Error("'Price' deve ser um número"); 
            }
        }

        if(category !== undefined){
            if(category !== CATEGORIA.ACESSORIOS && category !== CATEGORIA.CALCADOS && category !== CATEGORIA.ROUPAS){
                res.status(400)
                throw new Error("'Category' deve ser uma das categorias do enum"); 
            }
        }
    
        const newProduct: TProduct = {
            id,
            name,
            price,
            category
        }
    
        products.push(newProduct)
    
        res.status(201).send("Produto criado com sucesso!")
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500).send(error.message)
        }
    }
})

app.post('/purchase', (req: Request, res: Response)=>{
    try {
        const {userId, productId, quantity, totalPrice} = req.body

        if(userId !== undefined){
            if(typeof userId !== 'string'){
                res.status(400)
                throw new Error("'UserId' deve ser uma string"); 
            }

            const userExists = users.find((user) => user.id === userId)
            if(!userExists){
                res.status(400)
                throw new Error("Usuário não encontrado");
            }
        }

        if(productId !== undefined){
            if(typeof productId !== 'string'){
                res.status(400)
                throw new Error("'UserId' deve ser uma string"); 
            }

            const productExists = products.find((product) => product.id === productId)
            if(!productExists){
                res.status(400)
                throw new Error("Produto não encontrado");
            }
        }

        if(quantity !== undefined){
            if(typeof quantity !== 'number'){
                res.status(400)
                throw new Error("Quantity deve ser um número");
            }
        }
        
        if(totalPrice !== undefined){
            if(typeof totalPrice !== 'number'){
                res.status(400)
                throw new Error("Preço total deve ser um número");
            }
        }
    
        const newPurchase: TPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        } 
    
        purchase.push(newPurchase)
    
        res.status(201).send("Compra efetuada com sucesso!")
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500).send(error.message)
        }
    }
})

app.get('/products/:id', (req: Request, res: Response)=>{
    try {
        const {id} = req.params
    
        const result = products.find((product) => product.id === id)
    
        res.status(200).send(result)
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500).send(error.message)
        } 
    }
})

app.get('/users/:id/purchases', (req: Request, res: Response)=>{
    try {
        const {id} = req.params
    
        const result = purchase.find((user) => user.userId.toLowerCase() === id)
    
        result ? 
        res.status(200).send(result) :
        res.status(404).send('Compra de usuário não encontrada')
        
    } catch (error: any) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500).send(error.message)
        } 
    }
})


app.delete('/users/:id', (req: Request, res: Response)=>{
    const {id} = req.params

    const userIndex = users.findIndex((user) => user.id.toLowerCase() === id)
    
    userIndex >= 0 ?
    (users.splice(userIndex, 1),
    res.status(200).send('Usuário apagado com sucesso')) :
    res.status(404).send('Usuário não encontrado')
})

app.delete('/products/:id', (req: Request, res: Response)=>{
    const {id} = req.params

    const productIndex = products.findIndex((product) => product.id === id)

    productIndex >= 0 ?
    (products.splice(productIndex, 1), 
    res.status(200).send('Produto apagado com sucesso')) :
    res.status(404).send('Produto não encontrado')
})


app.put('/users/:id', (req: Request, res: Response)=>{
    const {id} = req.params

    const newId = req.body.id
    const newEmail = req.body.email
    const newPassword = req.body.password

    const findUser = users.find((user) => user.id.toLowerCase() === id)

    findUser ? (
        findUser.id = newId || findUser.id,
        findUser.email = newEmail || findUser.email,
        findUser.password = newPassword || findUser.password,
        res.status(200).send('Usuário atualizado com sucesso')
        ) :
        res.status(404).send('Usuário não encontrado')
})

app.put('/products/:id', (req: Request, res: Response)=>{
    const {id} = req.params

    const newId = req.body.id
    const newName = req.body.name
    const newPrice = req.body.price
    const newCategory = req.body.category

    const findProduct = products.find((product) => product.id === id)

    findProduct ? (
        findProduct.id = newId || findProduct.id,
        findProduct.name = newName || findProduct.name,
        findProduct.price = newPrice || findProduct.price,
        findProduct.category = newCategory || findProduct.category,
        res.status(200).send('Produto atualizado com sucesso')
        ) :
        res.status(404).send('Produto não encontrado')
})