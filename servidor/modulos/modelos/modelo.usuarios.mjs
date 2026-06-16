import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    foto:{
        type: String,
        required: true
    }
}, {
    collection: 'usuarios'
})

const usersModel = mongoose.model('Usuario', usersSchema);

export default usersModel;