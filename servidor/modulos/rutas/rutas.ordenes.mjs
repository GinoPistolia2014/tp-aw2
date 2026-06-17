import express from 'express';
import { 
    crearOrdenControlador, 
    obtenerOrdenesControlador, 
} from '../controladores/controlador.ordenes.mjs';

const ordersRouter = express.Router();

ordersRouter.get('/ordenes', obtenerOrdenesControlador);
ordersRouter.post('/ordenes', crearOrdenControlador);

export default ordersRouter