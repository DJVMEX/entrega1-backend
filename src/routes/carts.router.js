import Router from "express";
import { cartVerify } from "../middlewares/carts.verify.js";
import CartsManager from "../manager/carts.manager.js";

const router = Router();
const cartsMananger = new CartsManager('./src/data/carts.json');


//Listar los Carritos Existentes.
router.get('/', async (req, res)=>{
    const carts = await cartsMananger.getCarts();
    res.status(200).json(carts);
})

//Listo un Carrito por medio de id.
router.get('/:cid', async (req, res)=>{
    const {cid} = req.params;
    const cart = await cartsMananger.getCart(cid);
    res.status(200).json(cart);
})


//Creo un nuevo Carrito en Blanco.
router.post('/', async (req, res)=>{
    const cart = await cartsMananger.createCart();
    res.status(200).json(cart);
})

router.post('/:cid/product/:pid', (req, res) => {

    const {cid, pid} = req.params;
    const product = cartsMananger.addProduct(cid, pid);
    res.status(200).json(product);
})

export default router;

