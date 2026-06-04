import express from 'express';
import { 
    crearOrden, 
    obtenerOrdenes, 
    obtenerOrdenPorId 
} from '../controladores/controlador.ordenes.mjs';

const ordersRouter = express.Router();

ordersRouter.get('/ordenes', obtenerOrdenes);
ordersRouter.get('/ordenes/:id', obtenerOrdenPorId);
/*router.post('/ordenes', crearOrden);
router.delete('/ordenes/:id', eliminarOrden);*/

export default ordersRouter