import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    imagen:{
        type: String,
        default: false
    },
    descripcion:{
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    talle: {
        type: String,
        default: 'S'
    },
    descuento: {
        type: Number,
        default: 0
    },
    id: {
        type: Number,
        required: true
    }
}, {
    collection: 'productos'
})

const productsModel = mongoose.model('Producto', productsSchema);

export default productsModel;