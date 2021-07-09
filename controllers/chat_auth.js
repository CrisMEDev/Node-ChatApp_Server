const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const crearUsuario = async( req = request, res = response ) => {

    const { name, email, password } = req.body;

    res.json({
        name,
        email,
        password
    });

}

module.exports = {
    crearUsuario
}



