import ordersModel from "../modelos/modelo.ordenes.mjs"

export async function obtenerOrdenes(req, res) {
    const ordenes = await ordersModel.find();
    res.status(200).json(ordenes);
};

export async function obtenerOrdenPorId(req, res) {
    const orderId = Number(req.params.id);
    const orden = await ordersModel.find({ id: orderId });
    await res.status(200).json(orden);
};

export async function crearOrden(req, res) {

    const productosAComprar = JSON.parse(localStorage.getItem('carrito'));
    const lastOrder = await ordersModel
        .findOne()
        .sort({ id: -1 });

    const newId = lastOrder.id + 1;

    const newOrder = await new ordersModel.create({
        nombreCompleto: req.params.fullname,
        email: req.params.email,
        direccion: req.params.address,
        metodoPago: req.params.paymentMethod.value,
        productos: productosAComprar,
        id: newId
    });

    const nuevaOrden = await ordersModel.find({ id: newId });

    await res.status(201).send({ 
        message: 'Orden creada exitosamente',
        payload: nuevaOrden
    });
    // await res.redirect('/views/confirmacionCompra.html');
};

// export async function eliminarOrden(req, res) {
//     const orderId = req.params.id;
//     await ordersModel.findByIdAndDelete(orderId);
//     res.status(200).json('Producto eliminado exitosamente');
// }
