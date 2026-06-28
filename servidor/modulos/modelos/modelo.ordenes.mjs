import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    nombreCompleto:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    metodoPago:{
        type: String,
        default: false
    },
    productos:{
        type: [{
            id: {
                type: Number
            },
            nombre: {
                type: String,
                required: true
            },
            precio: {
                type: Number,
                required: true
            },
            cantidad: {
                type: Number,
                required: true
            }
        }],
        default: false
    },
    total: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
}, {
    collection: 'ordenes'
});

const ordersModel = mongoose.model('Orden', ordersSchema);

export default ordersModel;