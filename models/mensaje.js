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

const MensajeSchema = Schema({
        de: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: [true, 'El id es obligatorio']    // El segundo es el mensaje de error que será mostrado en caso falte el nombre
        },
        
        para: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: [true, 'El id es obligatorio']
        },

        mensaje: {
            type: String,
            required: true
        }

        // fecha: {
        //     type: Date,
        //     default: new Date()
        // },

}, {
    timestamps: true
});

MensajeSchema.methods.toJSON = function(){

    // Genera una instancia de mi Schema con sus valores respectivos
    const { __v, _id, ...mensaje } = this.toObject(); // Saca la version y el password de mi objeto Schema y el resto lo deja en user

    return mensaje;
}


module.exports = model( 'Mensaje', MensajeSchema );


