import Router from "express";
import { cartVerify } from "../middlewares/carts.verify.js";
import CartsManager from "../manager/carts.manager.js";

const router = Router();
const cartsMananger = new CartsManager('./src/data/carts.json');


//Listar los Carritos Existentes.
router.get('/', async (req, res)=>{
    const carts = cartsMananger.getCarts();
    res.status(200).json(carts);
})

//Listo un Carrito por medio de id.
router.get('/', async (req, res)=>{
    const {cid} = req.params;

    const cart = cartsMananger.getCart(cid);
    res.status(200).json(cart);
})


//Creo un nuevo Carrito en Blanco.
router.post('/', async (req, res)=>{
    const cart = cartsMananger.createCart();
    res.status(200).json(cart);
})

/*
//consultar un usuario por id
router.get('/:cid', async (req,res)=>{
    try
    {
        const {cid} = req.params;
        const cart = carts.find(c => c.id === cid);
        res.status(200).json(cart);
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message})
    }
})


router.post('/', cartVerify, async (req, res)=>{
    pets.push(req.body)

    res.status(200).json({ msg : "Producto Agregado con Exito."});
})
*/

export default router;

