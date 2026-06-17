import express from 'express';
import { 
    agregarProductoControlador, 
    eliminarProductoControlador, 
    modificarProductoControlador, 
    obtenerProductoPorIdControlador, 
    obtenerProductosControlador } from "../controladores/controlador.productos.mjs";
import { verificacionImagenProducto } from '../multer/multer.productos.mjs';

const productsRouter = express.Router();

productsRouter.get('/productos', obtenerProductosControlador);
productsRouter.get('/productos/:id', obtenerProductoPorIdControlador);
productsRouter.post('/productos', verificacionImagenProducto, agregarProductoControlador);
productsRouter.put('/productos/:id', modificarProductoControlador);
productsRouter.delete('/productos/:id', eliminarProductoControlador);

export default productsRouter