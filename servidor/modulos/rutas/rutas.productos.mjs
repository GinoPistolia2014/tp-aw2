import express from 'express';
import { 
    agregarProductoControlador, 
    eliminarProductoControlador, 
    modificarProductoControlador, 
    obtenerProductoPorIdControlador, 
    obtenerProductosControlador } from "../controladores/controlador.productos.mjs";
import { verificacionImagenProducto } from '../middlewares/multer.productos.mjs';
import { comprobarToken } from '../middlewares/autenticacion.mjs';

const productsRouter = express.Router();

productsRouter.get('/productos', obtenerProductosControlador);
productsRouter.get('/productos/:id', obtenerProductoPorIdControlador);
productsRouter.post('/productos', comprobarToken, verificacionImagenProducto, agregarProductoControlador);
productsRouter.put('/productos/:nombre', comprobarToken, modificarProductoControlador);
productsRouter.delete('/productos/:id', comprobarToken, eliminarProductoControlador);

export default productsRouter