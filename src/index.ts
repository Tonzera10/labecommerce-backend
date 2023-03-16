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

app.get('/users', (req: Request, res: Response)=>{
    res.status(200).send(users)
})
// exercício 1

app.get('/products/:id', (req: Request, res: Response)=>{

    const {id} = req.params

    const result = products.find((product) => product.id === id)

    res.status(200).send(result)
})

app.get('/users/:id/purchases', (req: Request, res: Response)=>{

    const {id} = req.params

    const result = purchase.find((user) => user.userId.toLowerCase() === id)

    result ? 
    res.status(200).send(result) :
    res.status(404).send('Compra de usuário não encontrada')
})

// Exercícios 2

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

// Exercício 3

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