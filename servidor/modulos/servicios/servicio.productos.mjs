import productsModel from '../modelos/modelo.productos.mjs';

export async function buscarProductos() {
    const productos = await productsModel.find();
    return productos
};

export async function buscarProductoPorId(id) {
    const producto = await productsModel.find({ id: id });
    return producto
};

export async function agregarProducto(
    nombre,
    precio,
    categoria,
    imagen,
    descripcion,
    stock,
    talle,
    descuento,
    id
) {
    const nuevoProducto = await productsModel.create({
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        imagen: imagen,
        descripcion: descripcion,
        stock: stock,
        talle: talle,
        descuento: descuento,
        id: id
    });
    return nuevoProducto
};

export async function modificarProducto(nombre, campo, nuevoValor) {
    await productsModel.findOneAndUpdate( 
            { nombre: nombre },
            { 
                [campo]: nuevoValor
            }
        );

    const productoModificado = await productsModel.findOne({ nombre: nombre });
    return productoModificado
};

export async function eliminarProducto(id) {
    await productsModel.findOneAndDelete({ id: id });
    return
}