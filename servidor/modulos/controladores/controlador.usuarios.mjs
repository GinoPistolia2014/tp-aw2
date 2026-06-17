import usersModel from "../modelos/modelo.usuarios.mjs";
import { buscarUsuario, crearUsuario } from "../servicios/servicio.usuarios.mjs";
import jwt from 'jsonwebtoken';
import config from "../../config/config.mjs";

export async function crearUsuarioControlador(req, res) {
    try {
        const ultimoUsuario = await usersModel
            .findOne()
            .sort({ id: -1 });     
        
        const nuevoId = ultimoUsuario ? ultimoUsuario.id + 1 : 1;
        const nuevoUsuario = await crearUsuario(
            req.body.nombre,
            req.body.apellido,
            req.body.email,
            req.body.username,
            req.body.contrasena,
            req.file ? req.file.filename : false,
            nuevoId
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            payload: nuevoUsuario
        });
    } catch (error) {
        res.status(500).json(`Error al registrar usuario: ${error.message}`);
    };
};

export async function buscarUsuarioControlador(req, res) {
    try {
        const { campo, contenido } = req.params;

        const camposPermitidos = ['username', 'email'];

        if (!camposPermitidos.includes(campo)) {
            return res.status(400).json('Campo de búsqueda no válido');
        };

        const usuario = await buscarUsuario(campo, contenido);

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(`Error al buscar usuario: ${error.message}`);
    };
};

export async function firmarToken(req, res) {

    try {
        const { email, contrasena } = req.body;
        let usuario = await buscarUsuario('email', email);
        if(!usuario) return res.status(404).json('Usuario No Encontrado');

        if (email === usuario[0].email && contrasena === usuario[0].contrasena) {

            const datos = {
                username: usuario[0].username,
                email: usuario[0].email
            };

            jwt.sign(datos, config.JWToken, { expiresIn: '1h' }, (error, token) => {
                if (error) {
                    console.log(error.message);
                    return res.status(500).json({ error: 'Error al generar el token' })
                };

                res.cookie('token', token, {
                    signed: true,
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: true,
                    maxAge: 1000 * 60 * 60
                });

                res.status(200).json({
                message: 'Autenticación exitosa',
                payload: datos
            }); 
        }); 
        } else {
            res.status(401).json('Credenciales incorrectas');
        };
    } catch (error) {
        res.status(500).json(`Error al firmar cookie: ${error.message}`)
    };
};

export function comprobarToken(req, res, next) {

    const token = req.signedCookies['token'];
    /*if(!token) return res.status(401).json('Token inexistente. Acceso denegado');*/
    if(!token){
        res.redirect('/views/login.html');
        return;
    } 

    jwt.verify(token, config.JWToken, (error, usuario) => {
        if (error) {
            return res.status(403).json(`Token expirado o inválido: ${error.message}`);
        };
        console.log(usuario);
        req.usuario = usuario;
        next();
    })
}
