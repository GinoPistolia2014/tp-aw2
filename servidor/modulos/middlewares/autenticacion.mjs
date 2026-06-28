import jwt from 'jsonwebtoken';
import config from '../../config/config.mjs';

export function comprobarToken(req, res, next) {

    try {
        const token = req.signedCookies['token'];

        if (!token) {
            if (req.cookies.token) {
                return res.status(401).json({
                    message: 'Cookie no válida'
                });
            }

            return res.status(401).json({
                message: 'Token inexistente'
            });
        };


        jwt.verify(token, config.JWToken, (error, usuario) => {
            if (error) {
                console.error(error.message);
                return res.status(401).json(`Token expirado o inválido`);
            };
            req.usuario = usuario;
            next();
        }); 
    } catch (error) {
        console.error(error.message);
        return res.status(500).send(`Error al verificar token`);
    }
};