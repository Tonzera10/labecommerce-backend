

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});


    const newPurchase: TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice

