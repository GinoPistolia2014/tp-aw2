import usersModel from "../modelos/modelo.usuarios.mjs";

export async function crearUsuario(req, res) {
    try {
        const ultimoUsuario = await usersModel
            .findOne()
            .sort({ id: -1 });
        
        const nuevoId = ultimoUsuario ? ultimoUsuario.id + 1 : 1;
        await usersModel.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            username: req.body.username,
            contrasena: req.body.contrasena,
            foto: req.file ? req.file.filename : false,
            id: nuevoId
        });

        const busquedaVerificacion = await usersModel.find({ id: nuevoId });

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            payload: busquedaVerificacion
        });
    } catch (error) {
        res.status(500).json(`Error al registrar usuario: ${error.message}`);
    };
};

export async function buscarUsuario(req, res) {
    try {
        const { campo, contenido } = req.params;

        const camposPermitidos = ['username', 'email'];

        if (!camposPermitidos.includes(campo)) {
            return res.status(400).json('Campo de búsqueda no válido');
        }

        const usuario = await usersModel.find({
            [campo]: contenido
        });

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json(`Error al buscar usuario: ${error.message}`);
    }
}
