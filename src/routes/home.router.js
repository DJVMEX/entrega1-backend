import { Router } from "express";
const router = Router();

import ProductManager from "../manager/products.manager.js";
const productManager = new ProductManager('./src/data/products.json');


//mostrar productos
router.get('/home', async (req, res) => {
    try {
        const products = await productManager.getProducts();

        let tableProduct = '<table>';
        products.forEach((prod) => {
            tableProduct += `<tr><td>${prod.title}</td><td>${prod.description}</td><td>$ ${prod.price}</td><td>${prod.category}</td><td>${prod.stock}</td><botton></tr>`;
        });
        tableProduct += '</table>';

        res.render('home', {tableProduct});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
})

router.get('/realTimeProducts', async (req, res) => {
    res.render('realTimeProducts');
});

export default router