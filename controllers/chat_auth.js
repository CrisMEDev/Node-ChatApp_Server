const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');


const crearUsuario = async( req = request, res = response ) => {

    const { name, email, password, ...resto } = req.body;
    
    try {

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ){
            return res.status(400).json({ msg: 'Credenciales inválidas, intente de nuevo' });
        }

        if ( password ){
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync( password, salt );
        }

        // Alamacenar en la BD
        const usuario = new Usuario({ name, email, password: resto.password });
        await usuario.save()

        // Generar JWT
        const token = await generarJWT( usuario._id );
        
        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Server error - hable con el administrador'
        })
    }


}

module.exports = {
    crearUsuario
}



