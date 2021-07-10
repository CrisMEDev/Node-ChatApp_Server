const jwt = require('jsonwebtoken');

const comprobarJWT = ( token = '' ) => {

    try {

        // Verifica si es un JWT válido y si es así se extrae el uid del user que hizo la petición
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        return [ true, uid ];
        
    } catch (error) {
        // console.log(error);
        return [ false, 'no uid' ];
    }

}

module.exports = comprobarJWT;

