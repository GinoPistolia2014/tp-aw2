import ordersModel from "../modelos/modelo.ordenes.mjs"

export async function obtenerOrdenesControlador(req, res) {
    const ordenes = await ordersModel.find();
    res.status(200).json(ordenes);
};

export async function crearOrdenControlador(req, res) {

    try {
        const ultimaOrden = await ordersModel
        .findOne()
        .sort({ id: -1 });

        const nuevoId = ultimaOrden ? ultimaOrden.id + 1 : 1;

        const nuevaOrden = await ordersModel.create({
            nombreCompleto: req.body.nombreCompleto,
            email: req.body.email,
            direccion: req.body.direccion,
            metodoPago: req.body.metodoPago,
            productos: req.body.productos,
            total: req.body.total,
            id: nuevoId
        });

        res.status(201).send({ 
            message: 'Orden creada exitosamente',
            payload: nuevaOrden
        });

    } catch (error) {
        res.status(500).json(`Error al buscar usuario: ${error.message}`);
    }
}

