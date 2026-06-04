import productsModel from "../modelos/modelo.productos.mjs";

export async function obtenerProductos(req, res) {

    try {
        const productos = await productsModel.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json(`Error al obtener todos los productos: ${error.message}`);
    };
};

export async function obtenerProductoPorId(req, res) {

    try {
        const idParam = req.params.id;
        const producto = await productsModel.find({ id: idParam });
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json(`Error al obtener producto por id: ${error.message}`);
    };
}

export async function agregarProducto(req, res) {

    try {
        const lastProduct = await productsModel
        .findOne()
        .sort({ id: -1 });

        const newId = lastProduct.id + 1;
        const newProduct = await new productsModel({
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria,
            imagen: req.body.imagen,
            descripcion: req.body.descripcion,
            stock: req.body.stock,
            talle: req.body.talle,
            descuento: req.body.descuento,
            id: newId
        });

        await productsModel.create(newProduct);

        const result = await productsModel.findOne({ id: newId });
        await res.status(201).json({
            status:"success", 
            payload: result
        });

    } catch (error) {
        res.status(500).json(`Error al crear nuevo producto: ${error.message}`);
    }
};

export async function modificarProducto(req, res) {

    try {
        const id = Number(req.params.id);
        const campoAModificar = req.body.criterio;
        const value = req.body.nuevaInfo;

        if (
            campoAModificar === 'Precio' || 
            campoAModificar === 'Stock' ||
            campoAModificar === 'Descuento'
            ) {
            Number(value);
        };

        await productsModel.findOneAndUpdate( 
            { id: id },
            { 
                [campoAModificar]: value
            }
        )

        const changedProduct = await productsModel.findOne({ id: id });
        await res.status(200).json({
            status:"success", 
            message:"Producto actualizado exitosamente",
            payload: changedProduct
        });

    } catch (error) {
        res.status(500).json(`Error al modificar producto: ${error.message}`);
    };
};

export async function eliminarProducto(req, res) {

    try {

        const id = req.params.id
        await productsModel.findOneAndDelete({ id: id });
        res.json({
            status:"success", 
            message:"Producto eliminado"
        });

    } catch (error) {
        res.status(500).json(`Error al eliminar producto: ${error.message}`);
    };
}