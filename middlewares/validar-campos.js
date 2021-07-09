const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {

    // Se toman los errores obtenidos del middleware check
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json( errors.mapped() );
    }

    next();     // El tercer argumento propio de un middleware que indica que pasa el middleware
                // después verifica el siguiente middleware y si no hay más, ejecuta el controlador de la petición
}


module.exports = {
    validarCampos
}