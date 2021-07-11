const { request, response } = require('express');

const Mensaje = require('../models/mensaje');

const obtenerMensajes = async( req = request, res = response ) => {

    const miId = req.usuario._id;
    const mensajesDe = req.params.de;

    const last40 =  await Mensaje.find({
        $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }]
    })
    .sort({ createdAt: 'desc' })
    .limit( 40 );

    res.json({
        mensajes: last40
    });

}

module.exports = {
    obtenerMensajes
}
