import express from 'express';
import { 
    agregarProducto, 
    eliminarProducto, 
    modificarProducto, 
    obtenerProductoPorId, 
    obtenerProductos } from "../controladores/controlador.productos.mjs";
import { verificacionImagenProducto } from '../multer/multer.productos.mjs';

const productsRouter = express.Router();

productsRouter.get('/productos', obtenerProductos);
productsRouter.get('/productos/:id', obtenerProductoPorId);
productsRouter.post('/productos', verificacionImagenProducto, agregarProducto);
productsRouter.put('/productos/:id', modificarProducto);
productsRouter.delete('/productos/:id', eliminarProducto);

export default productsRouter