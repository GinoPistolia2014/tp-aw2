import ordersModel from "../modelos/modelo.ordenes.mjs"

export async function obtenerOrdenesControlador(req, res) {
    const ordenes = await ordersModel.find();
    res.status(200).json(ordenes);
};

export async function crearOrdenControlador(req, res) {

    const productosAComprar = JSON.parse(localStorage.getItem('carrito'));
    const ultimaOrden = await ordersModel
        .findOne()
        .sort({ id: -1 });

    const nuevoId = ultimaOrden ? ultimaOrden.id + 1 : 1;

    const newOrder = await new ordersModel.create({
        nombreCompleto: req.params.fullname,
        email: req.params.email,
        direccion: req.params.address,
        metodoPago: req.params.paymentMethod.value,
        productos: productosAComprar,
        total: total || null,
        id: nuevoId
    });

    const nuevaOrden = await ordersModel.find({ id: newId });

    await res.status(201).send({ 
        message: 'Orden creada exitosamente',
        payload: nuevaOrden
    });
};

