import express from "express";
//import userRouter from "./routes/users.router.js";
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"

import morgan from "morgan";
import { __dirname } from './utils.js';

const app = express();

//Middleware
app.use(express.json()); //Acepta recibir Json
app.use(express.urlencoded({ extended: true })); //Acepta todo el contenido en las rutas url
app.use(express.static(__dirname + '/public')); //Defino la carpeta de elementos staticos
app.use(morgan('dev'));

//Rutas importadas desde la definicion en su archivo.
//app.use('/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

const PORT = 8080;
app.listen(PORT, () => { console.log(`Server ok en el puerto ${PORT}`)});
