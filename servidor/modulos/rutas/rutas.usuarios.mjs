import express from 'express'
import { 
    buscarUsuario,
    crearUsuario } from '../controladores/controlador.usuarios.mjs';
import { verificacionImagenUsuario } from '../multer/multer.usuarios.mjs';

const usersRouter = express.Router();

usersRouter.get('/usuarios/:campo/:contenido', buscarUsuario);
usersRouter.post('/usuarios', verificacionImagenUsuario, crearUsuario);

export default usersRouter