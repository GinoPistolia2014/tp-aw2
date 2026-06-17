import ordersModel from "../modelos/modelo.ordenes.mjs";

export async function buscarOrdenes() {
    const ordenes = await ordersModel.find();
    return ordenes
};

export async function craerOrden(nombre, email, direccion, metodoPago, productos, total, id) {
    const nuevaOrden = await ordersModel.create({
        nombreCompleto: nombre,
        email: email,
        direccion: direccion,
        metodoPago: metodoPago,
        productos: productos,
        total: total,
        id: id
    });
    return nuevaOrden
}