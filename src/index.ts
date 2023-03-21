import  express, { Request, Response} from 'express'
import cors from 'cors';
import { products, purchase, users } from './database';
import { TProduct, TPurchase, TUser } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response)=>{
    res.status(200).send("Pong")
})

// exercício 2

app.get('/users', (req: Request, res: Response)=>{
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response)=>{
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response)=>{
    const name = req.query.q as string

    const result = products.filter((product)=> {
        return product.name.toLowerCase().includes(name.toLowerCase())
    })

    res.status(200).send(result)
})

// exercício 3 vamos de novo

app.post('/users', (req: Request, res: Response)=>{
    const {id, email, password} = req.body

    const newUser: TUser = {
        id,
        email,
        password
    } 

    users.push(newUser)

    res.status(201).send("Usuário criadocom sucesso!")
})
app.post('/products', (req: Request, res: Response)=>{
    const {id, name, price, category} = req.body

    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send("Produto criado com sucesso!")
})
app.post('/purchase', (req: Request, res: Response)=>{
    const {userId, productId, quantity, totalPrice} = req.body

    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    } 

    purchase.push(newPurchase)

    res.status(201).send("Compra efetuada com sucesso!")
})