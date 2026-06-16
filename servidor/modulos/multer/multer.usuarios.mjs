import multer from 'multer'
import { nanoid } from 'nanoid'
import mime from 'mime-types'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const carpetaDestino = path.join(__dirname, '..', '..', 'public', 'img', 'fotosPerfil');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, carpetaDestino);
    },
    filename: function (req, file, cb) {
        const nombreArchivo = nanoid() + '.' + mime.extension(file.mimetype);
        cb(null, nombreArchivo);
    }
});

const subida = multer({
    storage: storage
});

const imageHandler = subida.single('userpic');

export const verificacionImagenUsuario = (req, res, next) => {
    imageHandler(req, res, (error) => {
        if (error) return res.status(500).json(`Error al subir imagen: ${error.message}`);
        next();
    });
}