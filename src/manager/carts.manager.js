import fs from "fs"
import { v4 as uuidv4} from 'uuid'

export default class CartsManager {
    
    constructor(path) {
        this.path = path;
    }

    //Listo todos los Carritos
    async getCarts() 
    {
        try
        {
            if(fs.existsSync(this.path))
            {
                const carts = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(carts);
            } else return [];
        }
        catch(error)
        {
            console.log(error);
        }
    }

    //Busco un Carrito Especifico
    async getCart(cid) 
    {
        try
        {
            if(fs.existsSync(this.path))
            {
                const carts = await fs.promises.readFile(this.path, 'utf8');
                const cart = carts.find( (c)=>c.id == cid )
                return JSON.parse(cart);
            } else return [];
        }
        catch(error)
        {
            console.log(error);
        }
    }

    //Crear un nuevo Carrito en Blanco.
    async createCart()
    {
        try
        {
            let id;
            let cartExist;
            const carts = await this.getCarts();

            do {
                id = uuidv4();
                cartExist = carts.find((c) => c.id === id);
            } while (cartExist);
        
            const cart = {
                id:id,
                "products" : []
            };
            
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return product;
        }
        catch(error)
        {
            console.log(error);
        }
    }


    async listProductsCart(cid)
    {

    }

}