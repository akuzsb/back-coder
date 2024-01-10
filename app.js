import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();

const productManager = new ProductManager('./productos.json');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("/products", async (req, res) => {
    let limit = req.query.limit;
    let products = await productManager.getProducts();
    if (limit) {
        products = products.slice(0, limit);
    }
    res.json(products);
});

app.get("/products/:id", async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
