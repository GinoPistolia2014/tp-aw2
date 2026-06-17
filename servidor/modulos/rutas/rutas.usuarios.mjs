import express from 'express'
import { 
    buscarUsuarioControlador,
    crearUsuarioControlador, 
    firmarToken } from '../controladores/controlador.usuarios.mjs';
import { verificacionImagenUsuario } from '../multer/multer.usuarios.mjs';

const usersRouter = express.Router();

usersRouter.get('/usuarios/:campo/:contenido', buscarUsuarioControlador);
usersRouter.post('/usuarios', verificacionImagenUsuario, crearUsuarioControlador);
usersRouter.post('/usuarios/autenticar', firmarToken);

export default usersRouter