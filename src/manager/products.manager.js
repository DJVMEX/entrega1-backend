import fs from "fs"
import { v4 as uuidv4} from 'uuid'

export default class ProductManager {
    #priceBaseGain = 0.15;

    constructor(path) {
        this.path = path;
    }

    async getProducts() 
    {
        try
        {
            if(fs.existsSync(this.path))
            {
                const products = await fs.promises.readFile(this.path, 'utf8');
                return JSON.parse(products);
            } else return [];
        }
        catch(error)
        {
            console.log(error);
        }
    }
 
    async createProduct(obj) 
    {
        let id;
        let productExist;
        const products = await this.getProducts();

        do {
            id = uuidv4();
            productExist = products.find((p) => p.id === id);
        } while (productExist);
    
        const product = {
            id:id,
            ...obj
        };

        try
        {
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return product;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async getProductById(idProduct) {
        try 
        {
            const products = await this.getProducts();
            return products.find(product => product.id === idProduct);

        } catch (error) {
            console.error('Error linea 86:', error);
            return false;
        }
    }


    async updateProduct(obj, id)
    {
        try
        {
            const products = await this.getProducts();
            let productExist = await this.getProductById(id);
            if(!productExist)
            {
                return "Product Not Found"                
            }
            else
            {
                productExist = { ...productExist, ...obj};

                const newArray = products.filter((p)=>p.id != id)
                newArray.push(productExist);

                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                return productExist;
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }


    async deleteProduct(id)
    {
        const products = await this.getProducts();
        if(products.length > 0 )
        {
            const productExist = await this.getProductById(id);
            if(productExist)
            {
                const newArray =  products.filter((p)=>p.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
                return true;    
            } return false;
        }
        else
        {
            return false
        }
    }
}