import express from 'express'
import { 
    autenticarUsuario,
    buscarUsuarioControlador,
    crearUsuarioControlador, 
    removerCookie } from '../controladores/controlador.usuarios.mjs';
import { verificacionImagenUsuario } from '../middlewares/multer.usuarios.mjs';
import { comprobarToken } from '../middlewares/autenticacion.mjs';

const usersRouter = express.Router();

usersRouter.get('/usuarios/:campo/:contenido', buscarUsuarioControlador);
usersRouter.post('/usuarios', verificacionImagenUsuario, crearUsuarioControlador);
usersRouter.post('/usuarios/autenticar', autenticarUsuario);
usersRouter.get('/usuarios/cerrarSesion', removerCookie);

//////Ruta para proteger funcionalidades modificadas en el DOM dentro del panel de administración
usersRouter.get('/auth-or-not', comprobarToken, (req, res) => {
    res.status(200).json('Autenticado');
})

export default usersRouter