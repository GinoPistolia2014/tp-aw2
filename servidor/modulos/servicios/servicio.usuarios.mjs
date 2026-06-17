import usersModel from '../modelos/modelo.usuarios.mjs';

export async function buscarUsuario(campo, contenido) {
    const usuario = await usersModel.find({
            [campo]: contenido
        });;
    return usuario
};

export async function crearUsuario(nombre, apellido, email, username, contrasena, foto, id) {
    const nuevoUsuario = await usersModel.create({
        nombre: nombre,
        apellido: apellido,
        email: email,
        username: username,
        contrasena: contrasena,
        foto: foto,
        id: id
    });
    return nuevoUsuario
}