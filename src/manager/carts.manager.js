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
                const cart = JSON.parse(carts).find( c => c.id == cid )
                return cart.products;
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
    
    async addProduct(cid, pid) {
        try {
            // Obtener todos los carritos
            const carts = await this.getCarts();
            
            // Encontrar el carrito específico por su ID
            let cart;
            for (let i = 0; i < carts.length; i++) {
                if (carts[i].id === cid) {
                    cart = carts[i];
                    break;
                }
            }
            
            // Si el carrito no existe, lanzar un error
            if (!cart) {
                throw new Error('No se encontró el carrito con el ID especificado.');
            }
            
            // Verificar si el producto ya existe en el carrito
            let existingProductIndex = -1;
            if (cart.products) {
                for (let i = 0; i < cart.products.length; i++) {
                    if (cart.products[i].id === pid) {
                        existingProductIndex = i;
                        break;
                    }
                }
            }
            
            // Si el producto no existe en el carrito, añadirlo
            if (existingProductIndex === -1) {
                const newProduct = {
                    id: pid,
                    quantity: 1
                };
                if (!cart.products) {
                    cart.products = [newProduct];
                } else {
                    cart.products.push(newProduct);
                }
            } else {
                // Si el producto ya existe, incrementar su cantidad
                cart.products[existingProductIndex].quantity += 1;
            }
            
            // Guardar los cambios en el archivo
            for (let i = 0; i < carts.length; i++) {
                if (carts[i].id === cid) {
                    carts[i] = cart;
                    break;
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            
            // Retornar el producto modificado o añadido
            return cart.products.find(item => item.id === pid);
        } catch (error) {
            console.error('Error al asignar producto:', error.message);
            throw error;
        }
    }
    
    
    


    async listProductsCart(cid)
    {

    }

}