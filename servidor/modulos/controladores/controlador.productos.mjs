import productsModel from "../modelos/modelo.productos.mjs";
import { 
    agregarProducto, 
    buscarProductoPorId, 
    buscarProductos, 
    eliminarProducto, 
    modificarProducto } from "../servicios/servicio.productos.mjs";

export async function obtenerProductosControlador(req, res) {

    try {
        const productos = await buscarProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json(`Error al obtener todos los productos: ${error.message}`);
    };
};

export async function obtenerProductoPorIdControlador(req, res) {

    try {
        const idParam = req.params.id;
        const producto = await buscarProductoPorId(idParam);
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json(`Error al obtener producto por id: ${error.message}`);
    };
}

export async function agregarProductoControlador(req, res) {

    try {
        ///Búsqueda del último n° de ID presente de la BD para luego sumarle 1 mas al nuevo producto
        const ultimoProducto = await productsModel
            .findOne()
            .sort({ id: -1 });
        
        const nuevoId = ultimoProducto ? ultimoProducto.id + 1 : 1;

        ///Composición del producto
        const nuevoProducto = await agregarProducto(
            req.body.nombre,
            req.body.precio,
            req.body.categoria,
            req.file.filename,
            req.body.descripcion,
            req.body.stock,
            req.body.talle,
            req.body.descuento,
            nuevoId
        );

        await res.status(201).json({
            status:"success", 
            payload: nuevoProducto
        });

    } catch (error) {
        res.status(500).json(`Error al crear nuevo producto: ${error.message}`);
    }
};

export async function modificarProductoControlador(req, res) {

    try {
        const id = Number(req.params.id);
        const campoAModificar = req.body.criterio;
        const value = req.body.nuevaInfo;
        let producto;

        if (
            campoAModificar === 'Precio' || 
            campoAModificar === 'Stock' ||
            campoAModificar === 'Descuento'
            ) {
            Number(value);
        };

        const busqueda = await buscarProductoPorId(id);

        if (!busqueda) {
            return res.status(404).json(`Producto no encontrado`);
        } else {
            producto = await modificarProducto(id, campoAModificar, value);
        };

        res.status(200).json({
            status:"success", 
            message:"Producto actualizado exitosamente",
            payload: producto
        });

    } catch (error) {
        res.status(500).json(`Error al modificar producto: ${error.message}`);
    };
};

export async function eliminarProductoControlador(req, res) {

    try {

        const id = req.params.id

        const busqueda = await buscarProductoPorId(id);
        if (!busqueda) {
            return res.status(404).json(`Producto no encontrado.`);
        };

        await eliminarProducto(id);
        res.status(204).json({
            status:"success", 
            message:"Producto eliminado"
        });

    } catch (error) {
        res.status(500).json(`Error al eliminar producto: ${error.message}`);
    };
}