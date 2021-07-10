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
        
        res.status(201).json({
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

const loginUsuario = async( req = request, res = response ) => {

    
    try {
        
        const { email, password, ...resto } = req.body;

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ){
            return res.status(400).json({
                msg: 'El usuario y/o contraseña no son correctos'
            });
        }

        // Verificar si está activo en la BD
        if ( !usuario.state ){
            return res.status(400).json({
                msg: 'El usuario / contraseña no son correctos'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ){
            return res.status(400).json({
                msg: 'El usuario / contraseña no son correctos'
            });
        }

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

const renewToken = async( req = request, res = response ) => {

    const usuario = req.usuario;

    try {
        // Generar JWT
        const token = await generarJWT( usuario._id );

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salió mal, contacte con su administrador'
        });
    }

}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken
}



