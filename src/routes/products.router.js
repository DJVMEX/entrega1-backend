import Router from "express";
const router = Router();

import ProductManager from "../manager/products.manager.js";
import { productVerify } from "../middlewares/product.verify.js";

const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    try
    {
        const products = await productManager.getProducts();
        res.status(200).json(products);    
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message})
    }
})


//consultar un usuario por id
router.get('/:id', async (req,res)=>{
    try
    {
        const {id} = req.params;
        const product = await productManager.getProductById(id)
        res.status(200).json(product);
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message})
    }
})


//crear un nuevo usuario.
router.post('/', productVerify , async (req, res) => {
    try
    {
        const user = await productManager.createProduct(req.body)
        res.status(200).json(user);    
    }
    catch(error)
    {         
        res.status(500).json({ msg: error.message})
    }
})


//actualizar un usuario por id
router.put('/:id', async(req, res)=>{
    try
    {
        const { id } = req.params;
        const product = await productManager.updateProduct(req.body, id);
        if( !product ) res.status(500).json({ msg: "Error Update"})
        else res.status(200).json(product);
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message})
    }
})


//eliminar un usuario por id
router.delete("/:id", async (req, res) => {

    try
    {
        const {id} = req.params;
        const delProduct = await productManager.deleteProduct(id);
        if(!delProduct) res.status(500).json({ msg: "Product already Exists"})
        else res.status(200).json({msg:`Product id: ${id} deleted `});
    }
    catch(error)
    {
        res.status(500).json({ msg: error.message})
    }

})

export default router;