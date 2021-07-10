const { response, request } = require('express');

const Usuario = require('../models/usuario');

const obtenerUsuarios = async( req = request, res = response ) => {

    
    try {
        const desde = Number( req.query.desde ) || 0;

        const usuarios = await Usuario
                .find({ _id: { $ne: req.usuario._id } })    // Excluye del listado el documento del user que hace la petición
                .sort( '-online' )  // Ordena los booleanos del online de manera descendente
                .skip( desde )
                .limit( 20 )         // Devuelve 2 usuarios tras cada petición

        res.json({
            usuarios,
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error, contacte con el administrador'
        });
    }

}

module.exports = {
    obtenerUsuarios
}
