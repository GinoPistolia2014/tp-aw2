import express from 'express';
import { 
    crearOrdenControlador, 
    obtenerOrdenesControlador } from '../controladores/controlador.ordenes.mjs';
import { comprobarToken } from '../middlewares/autenticacion.mjs';

const ordersRouter = express.Router();

ordersRouter.get('/ordenes', comprobarToken, obtenerOrdenesControlador);
ordersRouter.post('/ordenes', crearOrdenControlador);

export default ordersRouter