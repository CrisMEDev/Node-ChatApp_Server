// {
//     nombre: '',
//     correo: '',
//     pass: '',       // Encriptado
//     img: '',
//     role: '',
//     estado: false,  // Eliminado para los usuarios pero no de la base de datos
//     google: true,   // Para saber si el usuario fue creado por google o el sistema propio del backend
// }

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
        name: {
            type: String,
            required: [true, 'El nombre es obligatorio']    // El segundo es el mensaje de error que será mostrado en caso falte el nombre
        },
        
        email: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true
        },

        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria']
        },       // Encriptado

        online: {
            type: Boolean,
            default: false
        },

        state: {
            type: Boolean,
            default: true
        },  // Eliminado para los usuarios pero no de la base de datos
});

UsuarioSchema.methods.toJSON = function(){

    // Genera una instancia de mi Schema con sus valores respectivos
    const { __v, state, password, _id, ...user } = this.toObject(); // Saca la version y el password de mi objeto Schema y el resto lo deja en user

    user.uid = _id; // Agrega a la instancia de usuario nuevamente el id pero renombrado a uid

    return user;
}


module.exports = model( 'Usuario', UsuarioSchema );


