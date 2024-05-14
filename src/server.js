import express from "express";
//import userRouter from "./routes/users.router.js";
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import handlebars from "express-handlebars";
import viewsRouter from './routes/views.router.js'
import homeRouter from "./routes/home.router.js"
import { Server } from 'socket.io'

import ProductManager from "./manager/products.manager.js";
const productManager = new ProductManager('./src/data/products.json');


import morgan from "morgan";
import { __dirname } from './utils.js';
const app = express();

console.log(__dirname);  // Esto te mostrará la ruta actual de __dirname

//const products = [];

//Middleware
app.use(express.json()); //Acepta recibir Json 
app.use(express.urlencoded({ extended: true })); //Acepta todo el contenido en las rutas url
app.use(express.static(__dirname + '/public')); //Defino la carpeta de elementos staticos
app.use(morgan('dev'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/', homeRouter)

//websocket
//probando plantilla
//app.use('/ws', (req, res) => {
//    res.render('websocket');
//});


//probando plantilla
//app.use('/', viewsRouter);

//Rutas importadas desde la definicion en su archivo.
//app.use('/users', userRouter)
//app.use('/api/products', productRouter)
//app.use('/api/carts', cartRouter)

const PORT = 8080;
const httpServer = app.listen(PORT, () => { 
    console.log(`Server ok en el puerto ${PORT}`)
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {

    const products = await productManager.getProducts();

        let tableProduct = '<table>';
        products.forEach((prod) => {
            tableProduct += `<tr>
                    <td>${prod.title}</td>
                    <td>${prod.description}</td>
                    <td>$ ${prod.price}</td>
                    <td>${prod.category}</td>
                    <td>${prod.stock}</td>
                    <td><button onclick="eliminarProducto('${prod.id}')">Eliminar</button></td>
                </tr>`;

        });
        tableProduct += '</table>';
        socketServer.emit('products', tableProduct);


    //Fin Conexion
    socket.on('disconnect', ()=>{
        console.log('Usuario Desconectado')
    })

    //Eventos
    socket.on('newProduct', async (product)=>{
        const user = await productManager.createProduct(product);
        const products = await productManager.getProducts();

        let tableProduct = '<table>';
        products.forEach((prod) => {
            tableProduct += `<tr>
                    <td>${prod.title}</td>
                    <td>${prod.description}</td>
                    <td>$ ${prod.price}</td>
                    <td>${prod.category}</td>
                    <td>${prod.stock}</td>
                    <td><button onclick="eliminarProducto('${prod.id}')">Eliminar</button></td>
                </tr>`;

        });
        tableProduct += '</table>';
        socketServer.emit('products', tableProduct);
    })


    socket.on('deleteProduct', async (id)=>{
        const delProduct = await productManager.deleteProduct(id);

        const products = await productManager.getProducts();

        let tableProduct = '<table>';
        products.forEach((prod) => {
            tableProduct += `<tr>
                    <td>${prod.title}</td>
                    <td>${prod.description}</td>
                    <td>$ ${prod.price}</td>
                    <td>${prod.category}</td>
                    <td>${prod.stock}</td>
                    <td><button onclick="eliminarProducto('${prod.id}')">Eliminar</button></td>
                </tr>`;

        });
        tableProduct += '</table>';
        socketServer.emit('products', tableProduct);
    })

})